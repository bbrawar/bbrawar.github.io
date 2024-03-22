document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('getBibtexBtn').addEventListener('click', function() {
        var doi = document.getElementById('doi').value;
        var apiUrl = "https://api.crossref.org/works/" + doi;

        $.get(apiUrl, function(data) {
            if (data.message && data.message.title && data.message.author && data.message['published-print']) {
                var title = data.message.title[0];
                var authors = data.message.author.map(function(author) {
                    return  author.given + ' ' +author.family;
                }).join(' and ');

                var publishedDate = data.message['published-print']['date-parts'][0];
                var year = publishedDate[0];
                var month = publishedDate[1];

                var volume = data.message.volume;
                var issue = data.message.issue;
                var pages = data.message.page;
                var journal = data.message['container-title'][0];
                var publisher = data.message.publisher;

                var bibtex = '@article{' + author + year + ',\n' +
                             '  doi = {' + doi + '},\n' +
                             '  url = {' + data.message.URL + '},\n' +
                             '  year = {' + year + '},\n' +
                             '  month = {' + month + '},\n' +
                             '  publisher = {' + publisher + '},\n' +
                             '  volume = {' + volume + '},\n' +
                             '  number = {' + issue + '},\n' +
                             '  pages = {' + pages + '},\n' +
                             '  author = {' + authors + '},\n' +
                             '  title = {' + title + '},\n' +
                             '  journal = {' + journal + '}\n' +
                             '}';
                
                document.getElementById('bibtex').innerText = bibtex;
            } else {
                document.getElementById('bibtex').innerText = "BibTeX data not found for the provided DOI.";
            }
        });
    });
});
