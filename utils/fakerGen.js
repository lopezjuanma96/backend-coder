import faker from 'faker'

faker.locale = 'es'

const { commerce, date } = faker;

export const productFaker = (number) => {
    const fakes = []
    for (var i=0; i<number; i++){
        const eachTitle = commerce.product()
        fakes.push({
            id: i+1,
            title: eachTitle,
            price: commerce.price(),
            thumbnail: `${eachTitle}.png`,
            timestamp: Date.parse(date.past())
        })
    }
    return fakes
}