import * as t from "io-ts";
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
  JSSTConst,
  JSSTReference,
  JSSTReferenceTopLevel,
  JSSTArray_,
  JSSTObject_,
  JSSTOneOf_,
  JSSTAnyOf_,
  JSSTAllOf_,
  JSSTNot_,
  JSSTReferenceTopLevel_,
  JSSTGenericTopLevel,
  JSSTGenericTopLevel_,
  JSSTNumber_,
  JSSTInteger_,
  JSSTString_,
  JSSTReference_,
  JSSTConst_,
  JSSTNull_,
  JSSTBoolean_
} from "../src/";

test("JSSTConst", () => {
  const _: JSSTConst = { const: "foo" };
  expect(JSSTConst_.is(_)).toBe(true);
});

test("JSSTReference", () => {
  const _: JSSTReference = { $ref: "foo" };
  expect(JSSTReference_.is(_)).toBe(true);
});

test("JSSTNull", () => {
  const _: JSSTNull = { type: "null" };
  expect(JSSTNull_.is(_)).toBe(true);
});

test("JSSTBoolean", () => {
  const _: JSSTBoolean = { type: "boolean" };
  expect(JSSTBoolean_.is(_)).toBe(true);
});

test("JSSTInteger", () => {
  const _: JSSTSimpleInteger = { type: "integer" };
  const __: JSSTInteger = _;
  expect(JSSTInteger_.is(_)).toBe(true);
});

test("JSSTInteger with minimum", () => {
  const _: JSSTIntegerWithMinimum = { type: "integer", minimum: 0 };
  const __: JSSTInteger = _;
  expect(JSSTInteger_.is(_)).toBe(true);
});

test("JSSTInteger with exclusiveMaximum", () => {
  const _: JSSTIntegerWithNumericExclusiveMaximum = {
    type: "integer",
    exclusiveMaximum: 0
  };
  const __: JSSTInteger = _;
  expect(JSSTInteger_.is(_)).toBe(true);
});

test("JSSTInteger with enum", () => {
  const _: JSSTIntegerEnum = { type: "integer", enum: [22] };
  const __: JSSTInteger = _;
  expect(JSSTInteger_.is(_)).toBe(true);
});

test("JSSTNumber", () => {
  const _: JSSTSimpleNumber = { type: "number", maximum: 55.0 };
  const __: JSSTNumber = _;
  expect(JSSTNumber_.is(_)).toBe(true);
});

test("JSSTNumber with enum", () => {
  const _: JSSTNumberEnum = { type: "number", enum: [22.0] };
  const __: JSSTNumber = _;
  expect(JSSTNumber_.is(_)).toBe(true);
});

test("JSSTString", () => {
  const _: JSSTSimpleString = { type: "string" };
  const __: JSSTString = _;
  expect(JSSTString_.is(_)).toBe(true);
});

test("JSSTString with faker", () => {
  const _: JSSTSimpleString = { type: "string", faker: "address.city" };
  const __: JSSTString = _;
  expect(JSSTString_.is(_)).toBe(true);
});

test("JSSTString with enum", () => {
  const _: JSSTStringEnum = { type: "string", enum: ["foo"] };
  const __: JSSTString = _;
  expect(JSSTString_.is(_)).toBe(true);
});

test("JSSTArray as list", () => {
  const _: JSSTList = { type: "array", items: { type: "string" } };
  const __: JSSTArray = _;
  expect(JSSTArray_.is(_)).toBe(true);
});

test("JSSTArray as tuple", () => {
  const _: JSSTTuple = { type: "array", items: [{ type: "string" }] };
  const __: JSSTArray = _;
  expect(JSSTArray_.is(_)).toBe(true);
});

test("JSSTObject", () => {
  const _: JSSTObject = {
    type: "object",
    properties: { foo: { type: "string" } }
  };
  expect(JSSTObject_.is(_)).toBe(true);
});

const DateType = new t.Type<Date, Date, unknown>(
  "Date",
  (input: unknown): input is Date => input instanceof Date,
  (input, context) =>
    input instanceof Date ? t.success(input) : t.failure(input, context),
  t.identity
);
test("JSSTObject with custom property", () => {
  const _: JSSTObject<Date> = {
    type: "object",
    properties: { foo: { type: "string" }, bar: new Date() }
  };
  expect(JSSTObject_.is(_)).toBe(false);
  expect(JSSTObject(DateType, t.any).is(_)).toBe(true);
});

test("JSSTObject with custom property and universal extension", () => {
  const _: JSSTObject<Date, { unmock?: "rocks" }> = {
    type: "object",
    properties: { foo: { type: "string" }, bar: new Date() },
    unmock: "rocks"
  };
  expect(JSSTObject_.is(_)).toBe(false);
  expect(JSSTObject(DateType, t.any).is(_)).toBe(true);
});

test("JSSTTopLevel with custom property", () => {
  const _: JSSTGenericTopLevel<Date> = new Date();
  expect(JSSTGenericTopLevel_.is(_)).toBe(false);
  expect(JSSTGenericTopLevel(DateType, t.any).is(_)).toBe(true);
});

test("JSSTOneOf", () => {
  const _: JSSTOneOf = {
    oneOf: [{ type: "object", properties: { foo: { type: "string" } } }]
  };
  expect(JSSTOneOf_.is(_)).toBe(true);
});

test("JSSTAnyOf", () => {
  const _: JSSTAnyOf = {
    anyOf: [{ type: "object", properties: { foo: { type: "string" } } }]
  };
  expect(JSSTAnyOf_.is(_)).toBe(true);
});

test("JSSTAllOf", () => {
  const _: JSSTAllOf = {
    allOf: [{ type: "object", properties: { foo: { type: "string" } } }]
  };
  expect(JSSTAllOf_.is(_)).toBe(true);
});

test("JSSTNot", () => {
  const _: JSSTNot = {
    not: { type: "object", properties: { foo: { type: "string" } } }
  };
  expect(JSSTNot_.is(_)).toBe(true);
});

test("JSSTReference with top level works", () => {
  const _: JSSTReferenceTopLevel = { $ref: "foo", definitions: {} };
  expect(JSSTReferenceTopLevel_.is(_)).toBe(true);
});
