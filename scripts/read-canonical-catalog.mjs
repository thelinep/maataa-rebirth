import fs from "node:fs";
import ts from "typescript";

/** Read literal registry data without executing registry source. */
export function readCatalog(file, name) {
  const source=ts.createSourceFile(file,fs.readFileSync(file,"utf8"),ts.ScriptTarget.Latest,true);
  const literal=node=>{
    if(ts.isAsExpression(node)||ts.isSatisfiesExpression(node)||ts.isParenthesizedExpression(node))return literal(node.expression);
    if(ts.isStringLiteral(node)||ts.isNumericLiteral(node))return ts.isNumericLiteral(node)?Number(node.text):node.text;
    if(ts.isArrayLiteralExpression(node))return node.elements.map(literal);
    if(ts.isObjectLiteralExpression(node))return Object.fromEntries(node.properties.map(property=>{
      if(!ts.isPropertyAssignment(property))throw new Error(`Non-literal property in ${file}`);
      return [property.name.text,literal(property.initializer)];
    }));
    if(node.kind===ts.SyntaxKind.TrueKeyword)return true;
    if(node.kind===ts.SyntaxKind.FalseKeyword)return false;
    throw new Error(`Non-literal registry value in ${file}`);
  };
  for(const statement of source.statements) if(ts.isVariableStatement(statement))
    for(const declaration of statement.declarationList.declarations)
      if(declaration.name.getText(source)===name&&declaration.initializer)return literal(declaration.initializer);
  throw new Error(`Missing ${name} in ${file}`);
}
