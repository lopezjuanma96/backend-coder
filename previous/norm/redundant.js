import { normalize, denormalize, schema } from 'normalizr'
import util from 'util'

const originalData = {
    id: '999',
    posts: [
      {
        id: '123',
        author: {
          id: '1',
          nombre: 'Pablo',
          apellido: 'Perez',
          DNI: '20442654',
          direccion: 'CABA 123',
          telefono: '1567876547'
        },
        title: 'My awesome blog post',
        comments: [
          {
            id: '324',
            commenter: {
              id: '2',
              nombre: 'Nicole',
              apellido: 'Gonzalez',
              DNI: '20442638',
              direccion: 'CABA 456',
              telefono: '1567811543'
            }
          },
          {
            id: '325',
            commenter: {
              id: '3',
              nombre: 'Pedro',
              apellido: 'Mei',
              DNI: '20446938',
              direccion: 'CABA 789',
              telefono: '1567291542'
            }
          }
        ]
      },
      {
        id: '1123',
        author: {
          id: '2',
          nombre: 'Nicole',
          apellido: 'Gonzalez',
          DNI: '20442638',
          direccion: 'CABA 456',
          telefono: '1567811543'
        },
        title: 'My awesome blog post',
        comments: [
          {
            id: '1324',
            commenter: {
              id: '1',
              nombre: 'Pablo',
              apellido: 'Perez',
              DNI: '20442654',
              direccion: 'CABA 123',
              telefono: '1567876547'
            }
          },
          {
            id: '1325',
            commenter: {
              id: '3',
              nombre: 'Pedro',
              apellido: 'Mei',
              DNI: '20446938',
              direccion: 'CABA 789',
              telefono: '1567291542'
            }
          }
        ]
      },
      {
        id: '2123',
        author: {
          id: '3',
          nombre: 'Pedro',
          apellido: 'Mei',
          DNI: '20446938',
          direccion: 'CABA 789',
          telefono: '1567291542'
        },
        title: 'My awesome blog post',
        comments: [
          {
            id: '2324',
            commenter: {
              id: '2',
              nombre: 'Nicole',
              apellido: 'Gonzalez',
              DNI: '20442638',
              direccion: 'CABA 456',
              telefono: '1567811543'
            }
          },
          {
            id: '2325',
            commenter: {
              id: '1',
              nombre: 'Pablo',
              apellido: 'Perez',
              DNI: '20442654',
              direccion: 'CABA 123',
              telefono: '1567876547'
            }
          }
        ]
      }
    ]
  }

const author = new schema.Entity('authors');
const commenter = new schema.Entity('comments', {
    commenter: author
});

const post = new schema.Entity('posts', {
    author: author,
    comments: [commenter]
})

const history = new schema.Entity('history', {
    posts: [post]
})

const normData = normalize(originalData, history)

console.log('Original:')
console.log(util.inspect(originalData, false, 12))
console.log(JSON.stringify(originalData).length)
console.log('\n\nNorm:')
console.log(util.inspect(normData, false, 12))
console.log(JSON.stringify(normData).length)

console.log(`Compression rate: ${(100*JSON.stringify(normData).length/JSON.stringify(originalData).length).toFixed(2)}%`)

