export function permutate(arrA: any[], arrB: any[]): any[] {
  const result: any[] = [];

  arrA.forEach(elemA => {
    arrB.forEach(elemB => {
      result.push([elemA, elemB]);
    });
  });

  return result;
}
