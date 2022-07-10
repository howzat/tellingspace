import React from 'react';

// @ts-ignore
export default function wrapWithProvider({element}) {
    console.log('wrapWithProvider', element)
    return <>{element}</>;
}
