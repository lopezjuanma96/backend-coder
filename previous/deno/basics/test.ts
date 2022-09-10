import { assertEquals, assertStrictEquals } from 'https://deno.land/std@0.138.0/testing/asserts.ts';

Deno.test('example', ():void => {
    assertEquals('mundo', 'mundo')
})

Deno.test('strictExample', ():void => {
    assertStrictEquals(2, '2')
})

Deno.test('objects', ():void => {
    const a = {};
    const b = {};
    assertStrictEquals(a, b)
})

