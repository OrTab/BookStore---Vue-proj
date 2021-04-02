import { storageService } from './storageService';
import { utilService } from './utilService';

const defaultBooks = require('../data/books.json')
const BOOKS_KEY = 'books_db'


export default {
    query,
    getBookById,
    addReview,
    removeReview,
    getGoogleBooks,
    addGoogleBook
}



function query() {
    let books = storageService.load(BOOKS_KEY);
    if (!books || !books.length) {
        books = defaultBooks
        storageService.store(BOOKS_KEY, books);
    }
    return Promise.resolve(books)
}

function getBookById(bookId) {
    const books = storageService.load(BOOKS_KEY)
    const book = books.find(book => book.id === bookId)
    return Promise.resolve(book)
}

function getBookIdxById(bookId, books) {
    const bookIdx = books.findIndex(book => book.id === bookId)
    return Promise.resolve(bookIdx)
}

async function addReview(bookId, review) {
    const books = storageService.load(BOOKS_KEY)
    const idx = await getBookIdxById(bookId, books)
    review.id = utilService.makeId(4)
    if (!books[idx].reviews) books[idx].reviews = [review]
    else books[idx].reviews.unshift(review)
    storageService.store(BOOKS_KEY, books);
    return books[idx]

}

async function removeReview(bookId, reviewId) {
    const books = storageService.load(BOOKS_KEY)
    const idx = await getBookIdxById(bookId, books)
    const reviewIdx = books[idx].reviews.findIndex(review => review.id === reviewId)
    books[idx].reviews.splice(reviewIdx, 1)
    storageService.store(BOOKS_KEY, books);
    return books[idx]
}


async function getGoogleBooks(titleKeys) {

    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${titleKeys}`)
    return await res.json()

}


function addGoogleBook(book) {
    var googleBook = {
        id: utilService.makeId(),
        title: book.volumeInfo.title,
        subtitle: (book.volumeInfo.subtitle) ? book.volumeInfo.subtitle : 'Perspectives on a Literary Phenomenon',
        authors: book.volumeInfo.authors,
        publishedDate: book.volumeInfo.publishedDate,
        description: book.volumeInfo.description,
        pageCount: book.volumeInfo.pageCount,
        categories: book.volumeInfo.categories,
        thumbnail: (book.volumeInfo.imageLinks) ? book.volumeInfo.imageLinks.thumbnail : '',
        language: book.volumeInfo.language,
        listPrice: {
            amount: utilService.getRandomInt(15, 230),
            currencyCode: utilService.getRandomCurrency(),
            isOnSale: Math.random() > 0.5
        }
    }
    if (googleBook) {
        const books = storageService.load(BOOKS_KEY)
        books.push(googleBook)
        storageService.store(BOOKS_KEY, books)
        return Promise.resolve(googleBook)
    } else {
        return Promise.reject()
    }
}

