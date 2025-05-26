import { describe, expect, it, beforeEach } from 'vitest';
import { SdJwtVcCredential } from '../credentials/sdjwtvc.credential';

describe('SdJwtVcCredential', () => {
  let credential: SdJwtVcCredential;

  beforeEach(() => {
    credential = new SdJwtVcCredential('test-id', 'test-vct-value');
  });

  describe('processPathPointer', () => {
    // Create a method to access the private processPathPointer method for testing
    const invokeProcessPathPointer = (
      path: Array<string | null>,
      data: any,
    ): any[] => {
      return (credential as any).processPathPointer(path, data);
    };

    describe('String components - object key selection', () => {
      it('should select a property by name', () => {
        const data = { name: 'John', age: 30 };
        const result = invokeProcessPathPointer(['name'], data);
        expect(result).toEqual(['John']);
      });

      it('should navigate nested objects', () => {
        const data = { person: { name: 'John', age: 30 } };
        const result = invokeProcessPathPointer(['person', 'name'], data);
        expect(result).toEqual(['John']);
      });

      it('should throw error when accessing string key on non-object', () => {
        const data = ['name', 'age'];
        expect(() => invokeProcessPathPointer(['0'], data)).toThrow(
          'Path component requires object but found non-object element',
        );
      });

      it('should throw error when accessing string key on null', () => {
        const data = { name: null };
        expect(() => invokeProcessPathPointer(['name', 'prop'], data)).toThrow(
          'Path component requires object but found non-object element',
        );
      });

      it('should throw error when property does not exist and results in empty selection', () => {
        const data = { name: 'John' };
        expect(() => invokeProcessPathPointer(['age'], data)).toThrow(
          'No elements selected after processing path component',
        );
      });
    });

    describe('Null components - all array elements selection', () => {
      it('should select all elements from an array', () => {
        const data = { items: [1, 2, 3] };
        const result = invokeProcessPathPointer(['items', null], data);
        expect(result).toEqual([1, 2, 3]);
      });

      it('should throw error when using null on non-array', () => {
        const data = { items: 'not-an-array' };
        expect(() => invokeProcessPathPointer(['items', null], data)).toThrow(
          'Null path component requires array but found non-array element',
        );
      });

      it('should process all array elements for the next segment', () => {
        const data = {
          people: [
            { name: 'John', roles: ['admin', 'user'] },
            { name: 'Jane', roles: ['editor'] },
          ],
        };
        // Select all people, then all roles for each person
        const result = invokeProcessPathPointer(
          ['people', null, 'roles', null],
          data,
        );
        expect(result).toEqual(['admin', 'user', 'editor']);
      });

      it('should throw error on empty array', () => {
        const data = { items: [] };
        expect(() => invokeProcessPathPointer(['items', null], data)).toThrow(
          'No elements selected after processing path component',
        );
      });
    });

    describe('Number components - array index selection', () => {
      // Note: This isn't in the type definition but the implementation handles it
      it('should select element by index from an array', () => {
        const data = { items: [1, 2, 3] };
        // Using any to bypass TypeScript's type checking
        const path: any = ['items', 1];
        const result = invokeProcessPathPointer(path, data);
        expect(result).toEqual([2]); // 0-based index, so index 1 is the second element (2)
      });

      it('should throw error when using number on non-array', () => {
        const data = { items: 'not-an-array' };
        // Using any to bypass TypeScript's type checking
        const path: any = ['items', 1];
        expect(() => invokeProcessPathPointer(path, data)).toThrow(
          'Numeric path component requires array but found non-array element',
        );
      });

      it('should throw error when index is out of bounds', () => {
        const data = { items: [1, 2, 3] };
        // Using any to bypass TypeScript's type checking
        const path: any = ['items', 10]; // Index out of bounds
        expect(() => invokeProcessPathPointer(path, data)).toThrow(
          'No elements selected after processing path component',
        );
      });
    });

    describe('Complex paths and combinations', () => {
      it('should handle complex nested structures', () => {
        const data = {
          organization: {
            departments: [
              {
                name: 'Engineering',
                teams: [
                  { name: 'Frontend', members: ['Alice', 'Bob'] },
                  { name: 'Backend', members: ['Charlie', 'Dave'] },
                ],
              },
              {
                name: 'Marketing',
                teams: [{ name: 'Growth', members: ['Eve', 'Frank'] }],
              },
            ],
          },
        };

        // Get all team names
        const teamNames = invokeProcessPathPointer(
          ['organization', 'departments', null, 'teams', null, 'name'],
          data,
        );
        expect(teamNames).toEqual(['Frontend', 'Backend', 'Growth']);

        // Get all members from all teams
        const allMembers = invokeProcessPathPointer(
          ['organization', 'departments', null, 'teams', null, 'members', null],
          data,
        );
        expect(allMembers).toEqual([
          'Alice',
          'Bob',
          'Charlie',
          'Dave',
          'Eve',
          'Frank',
        ]);
      });

      it('should throw error for invalid path component', () => {
        const data = { name: 'John' };
        // Using any to bypass TypeScript's type checking
        const path: any = ['name', true];
        expect(() => invokeProcessPathPointer(path, data)).toThrow(
          'Invalid path component: true',
        );
      });
    });

    describe('Match claim functionality', () => {
      // Access the private matchClaim method for testing
      const invokeMatchClaim = (
        claim: any,
        data: Record<string, unknown>,
      ): boolean => {
        return (credential as any).matchClaim(claim, data);
      };

      it('should match a simple claim', () => {
        const claim = { path: ['name'] };
        const data = { name: 'John' };
        expect(invokeMatchClaim(claim, data)).toBe(true);
      });

      it('should match a claim with value restriction', () => {
        const claim = { path: ['age'], value: [30, 40] };
        const data = { age: 30 };
        expect(invokeMatchClaim(claim, data)).toBe(true);
      });

      it("should not match when value doesn't match restriction", () => {
        const claim = { path: ['age'], value: [40, 50] };
        const data = { age: 30 };
        expect(invokeMatchClaim(claim, data)).toBe(false);
      });

      it('should handle errors in path processing gracefully', () => {
        const claim = { path: ['items', null] };
        const data = { items: 'not-an-array' };
        expect(invokeMatchClaim(claim, data)).toBe(false);
      });

      it('should match array elements with null in path', () => {
        const claim = { path: ['items', null], value: [3] };
        const data = { items: [1, 2, 3, 4] };
        expect(invokeMatchClaim(claim, data)).toBe(true);
      });

      it("should return false when claim path doesn't exist", () => {
        const claim = { path: ['nonexistent'] };
        const data = { name: 'John' };
        expect(invokeMatchClaim(claim, data)).toBe(false);
      });
    });
  });
});
