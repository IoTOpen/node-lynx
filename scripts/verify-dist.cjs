#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const ts = require('typescript');

const repoRoot = path.resolve(__dirname, '..');
const esmFile = path.join(repoRoot, 'dist', 'esm', 'index.js');
const cjsFile = path.join(repoRoot, 'dist', 'cjs', 'index.cjs');
const typesFile = path.join(repoRoot, 'dist', 'src', 'index.d.ts');
const expectedFiles = [esmFile, cjsFile, typesFile];

const requiredRuntimeExports = [
  'LynxClient',
  'HTTPError',
  'formatFunctionValue',
  'formatFunctionValueStatus',
  'formatFunctionMessageStatus',
  'getFunctionStates',
  'getFunctionTimestampStatus',
  'LogOrder',
  'Permissions',
  'TraceAction',
  'TraceObjectType',
  'clone',
  'zero',
];

const requiredTypeExports = [
  ...requiredRuntimeExports,
  'LoginResult',
];

function fail(message, values = []) {
  console.error(message);
  values.forEach((value) => console.error('  -', value));
  process.exitCode = 1;
}

function isExported(node) {
  const modifiers = ts.canHaveModifiers(node) ? ts.getModifiers(node) : undefined;
  return modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword) ?? false;
}

function collectBindingNames(name, exports) {
  if (ts.isIdentifier(name)) {
    exports.add(name.text);
    return;
  }

  for (const element of name.elements) {
    if (!ts.isOmittedExpression(element)) {
      collectBindingNames(element.name, exports);
    }
  }
}

function collectTypeExports(sourceText) {
  const sourceFile = ts.createSourceFile(typesFile, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  if (sourceFile.parseDiagnostics.length > 0) {
    throw new Error('Generated declaration file contains syntax errors.');
  }

  const exports = new Set();
  for (const statement of sourceFile.statements) {
    if (ts.isExportDeclaration(statement) && statement.exportClause && ts.isNamedExports(statement.exportClause)) {
      statement.exportClause.elements.forEach((element) => exports.add(element.name.text));
      continue;
    }

    if (!isExported(statement)) {
      continue;
    }

    if (ts.isVariableStatement(statement)) {
      statement.declarationList.declarations.forEach((declaration) => collectBindingNames(declaration.name, exports));
      continue;
    }

    if ('name' in statement && statement.name && ts.isIdentifier(statement.name)) {
      exports.add(statement.name.text);
    }
  }

  return exports;
}

function findMissingExports(moduleExports, requiredExports) {
  return requiredExports.filter((name) => !Object.prototype.hasOwnProperty.call(moduleExports, name));
}

async function main() {
  const missingFiles = expectedFiles
    .filter((file) => !fs.existsSync(file))
    .map((file) => path.relative(repoRoot, file));

  if (missingFiles.length > 0) {
    fail('verify-dist: missing expected build artifacts:', missingFiles);
    return;
  }

  const typeExports = collectTypeExports(fs.readFileSync(typesFile, 'utf8'));
  const missingTypes = requiredTypeExports.filter((name) => !typeExports.has(name));
  if (missingTypes.length > 0) {
    fail('verify-dist: missing expected public exports in declarations:', missingTypes);
  }

  const esmExports = await import(`${pathToFileURL(esmFile).href}?verify=${Date.now()}`);
  const cjsExports = require(cjsFile);
  const missingEsmExports = findMissingExports(esmExports, requiredRuntimeExports);
  const missingCjsExports = findMissingExports(cjsExports, requiredRuntimeExports);

  if (missingEsmExports.length > 0) {
    fail('verify-dist: missing expected ESM runtime exports:', missingEsmExports);
  }
  if (missingCjsExports.length > 0) {
    fail('verify-dist: missing expected CJS runtime exports:', missingCjsExports);
  }

  if (!process.exitCode) {
    console.log('verify-dist: OK - artifacts, declarations, and runtime exports validated');
  }
}

main().catch((error) => {
  console.error('verify-dist: validation failed');
  console.error(error instanceof Error ? error.stack : error);
  process.exitCode = 1;
});
