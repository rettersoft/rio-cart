import ErrorMessages from '../packages/utils/error-messages';

// unnecessarily complicated ? 
// maybe
// does it work ?, 
// yes,
// problem ?
// no

// can 2 or more class has error with a code 1001 -> yes
// can a single class has 2 or more error with a code 1001 -> no
(() => {
    Object.keys(ErrorMessages()).forEach((c) => {     
        ErrorMessages()[c].forEach((m) => {
        if (ErrorMessages()[c].filter((mm) => m.code === mm.code).length > 1) 
            throw new Error(`Found a duplicate error message in ${c} -> code: ${m.code}`)
      })
    })
})()



