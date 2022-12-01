//export const apiUrl = 'http://nueva.republica.com.uy/wp-json/';
//export const apiUrl = 'http://babelshop.pixie.com.uy/wp-json/';
//export const apiUrl = 'http://5dedos.com.uy/wp-json/';
export const apiUrl = 'https://grupormultimedio.com/wp-json/';
//export const apiUrl = 'http://localhost/diariolr/wp-json/';

export const status = [
    {id: 'publish', name: 'Publicada'},
    {id: 'future', name: 'Programada'},
    {id: 'draft', name: 'Borrador'},
    {id: 'pending', name: 'Pendiente'},
    {id: 'private', name: 'Privada'},
];
export const postsTableHeadFields = [
    {id: 'title', name: 'Título'},
    {id: 'author', name: 'Autor'},
    {id: 'categories', name: 'Categorías'},
    {id: 'labels', name: 'Etiquetas'},
    {id: 'date', name: 'Fecha'},
    {id: 'link', name: 'Link'},
];
export const stringReplacement = {
    '&#038;': '&',
    '&#8211;': '-',
    '&#8216;': '\'',
    '&#8217;': '\'',
    '&#8220;': '"',
    '&#8221;': '"',
    '&#171;': '«',
    '&#187;': '»',
    '<p>': '',
    '</p>': '',
    '\n': '',
    '&#8230': '...',
}