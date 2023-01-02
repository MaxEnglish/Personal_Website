const getWord = () => {
    fetch ('https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=4&maxLength=4&api_key=ewnok8gtygsnov62psuoiwe6qckl8qfpzxa4wue8nhk14468l')
    .then((response) => response.json())
    .then((data) => {
        return data.word;
    })
    .catch((err)=> {
        console.log(err);
    })
}