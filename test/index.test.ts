import {
  JSSTInteger,
  JSSTIntegerWithMinimum,
  JSSTIntegerWithNumericExclusiveMaximum,
  JSSTNumber,
  JSSTNumberEnum,
  JSSTIntegerEnum,
  JSSTString,
  JSSTStringEnum,
  JSSTSimpleString,
  JSSTSimpleInteger,
  JSSTSimpleNumber,
  JSSTList,
  JSSTArray,
  JSSTTuple,
  JSSTObject,
  JSSTOneOf,
  JSSTAnyOf,
  JSSTAllOf,
  JSSTNot,
  JSSTBoolean,
  JSSTNull,
  JSSTEmpty,
  JSSTConst,
  JSSTReference
} from "../src/";

test("JSSTEmpty", () => {
  const _: JSSTEmpty = {};
  expect(JSSTEmpty.is(_)).toBe(true);
});

test("JSSTConst", () => {
  const _: JSSTConst = { const: "foo" };
  expect(JSSTConst.is(_)).toBe(true);
});

test("JSSTReference", () => {
  const _: JSSTReference = { $ref: "foo" };
  expect(JSSTReference.is(_)).toBe(true);
});

test("JSSTNull", () => {
  const _: JSSTNull = { type: "null" };
  expect(JSSTNull.is(_)).toBe(true);
});

test("JSSTBoolean", () => {
  const _: JSSTBoolean = { type: "boolean" };
  expect(JSSTBoolean.is(_)).toBe(true);
});

test("JSSTInteger", () => {
  const _: JSSTSimpleInteger = { type: "integer" };
  const __: JSSTInteger = _;
  expect(JSSTInteger.is(_)).toBe(true);
});

test("JSSTInteger with minimum", () => {
  const _: JSSTIntegerWithMinimum = { type: "integer", minimum: 0 };
  const __: JSSTInteger = _;
  expect(JSSTInteger.is(_)).toBe(true);
});

test("JSSTInteger with exclusiveMaximum", () => {
  const _: JSSTIntegerWithNumericExclusiveMaximum = {
    type: "integer",
    exclusiveMaximum: 0
  };
  const __: JSSTInteger = _;
  expect(JSSTInteger.is(_)).toBe(true);
});

test("JSSTInteger with enum", () => {
  const _: JSSTIntegerEnum = { type: "integer", enum: [22] };
  const __: JSSTInteger = _;
  expect(JSSTInteger.is(_)).toBe(true);
});

test("JSSTNumber", () => {
  const _: JSSTSimpleNumber = { type: "number", maximum: 55.0 };
  const __: JSSTNumber = _;
  expect(JSSTNumber.is(_)).toBe(true);
});

test("JSSTNumber with enum", () => {
  const _: JSSTNumberEnum = { type: "number", enum: [22.0] };
  const __: JSSTNumber = _;
  expect(JSSTNumber.is(_)).toBe(true);
});

test("JSSTString", () => {
  const _: JSSTSimpleString = { type: "string" };
  const __: JSSTString = _;
  expect(JSSTString.is(_)).toBe(true);
});

test("JSSTString with faker", () => {
  const _: JSSTSimpleString = { type: "string", faker: "address.city" };
  const __: JSSTString = _;
  expect(JSSTString.is(_)).toBe(true);
});

test("JSSTString with enum", () => {
  const _: JSSTStringEnum = { type: "string", enum: ["foo"] };
  const __: JSSTString = _;
  expect(JSSTString.is(_)).toBe(true);
});

test("JSSTArray as list", () => {
  const _: JSSTList = { type: "array", items: { type: "string" } };
  const __: JSSTArray = _;
  expect(JSSTArray.is(_)).toBe(true);
});

test("JSSTArray as tuple", () => {
  const _: JSSTTuple = { type: "array", items: [{ type: "string" }] };
  const __: JSSTArray = _;
  expect(JSSTArray.is(_)).toBe(true);
});

test("JSSTObject", () => {
  const _: JSSTObject = {
    type: "object",
    properties: { foo: { type: "string" } }
  };
  expect(JSSTObject.is(_)).toBe(true);
});

test("JSSTOneOf", () => {
  const _: JSSTOneOf = {
    oneOf: [{ type: "object", properties: { foo: { type: "string" } } }]
  };
  expect(JSSTOneOf.is(_)).toBe(true);
});

test("JSSTAnyOf", () => {
  const _: JSSTAnyOf = {
    anyOf: [{ type: "object", properties: { foo: { type: "string" } } }]
  };
  expect(JSSTAnyOf.is(_)).toBe(true);
});

test("JSSTAllOf", () => {
  const _: JSSTAllOf = {
    allOf: [{ type: "object", properties: { foo: { type: "string" } } }]
  };
  expect(JSSTAllOf.is(_)).toBe(true);
});

test("JSSTNot", () => {
  const _: JSSTNot = {
    not: { type: "object", properties: { foo: { type: "string" } } }
  };
  expect(JSSTNot.is(_)).toBe(true);
});
