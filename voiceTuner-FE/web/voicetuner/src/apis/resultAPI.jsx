import results from '../data/result.json';

export function getResultList() {

    return results;
}

export function getResult(id) {
    console.log(results);

    return results.filter(result => result.id === parseInt(id))[0];
}

// id의 태그 검색
export function searchTag(serchTag) {
    return results.filter(result => result.resultId.match(serchTag));
}