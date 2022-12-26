// "use strict"


// const BookService = {
//     name: 'BookService',
//     actions: {
//         newBook: {
//             rest:{
//                 method:'POST',
//                 path: '/books/new'
//             },
//             params:{
//                 title: "string",
//                 body: "string",
//                 writer: "string"
//             },

//             handler(this, ctx:any): any{
//                 return `O livro ${ctx.params.title} foi escrito por ${ctx.params.writer}`
//             },
//         },
//         listBooks: {
//             rest:{
//                 method:"GET",
//                 path: "/books/list"
//             },

//             params:{
//                 title: "string",
//             },

//             handler(this, ctx: any ){
//                 return [
//                     { title: "Livro 1", body: 'matematica', writer: 'ok'},
//                     { title: "Livro 2", body: 'Romance', writer: 'ok'},
//                     { title: "Livro 3", body: '', writer: 'ok'},
//                   ]
//             }
//         },
//         putBooks:{
//             rest:{
//                 method:"PUT",
//                 path: "/books/edit"
//             },

//             params:{
//                 id: "string",
//             },
//         }
//     }

// }

// export default BookService;