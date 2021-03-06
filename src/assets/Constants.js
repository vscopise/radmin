export const apiUrl = 'http://babelshop.pixie.com.uy/wp-json/';
export const username = 'api';
export const password = '1234';
export const status = [
    {id: 'publish', name: 'Publicada'},
    {id: 'future', name: 'Programada'},
    {id: 'draft', name: 'Borrador'},
    {id: 'pending', name: 'Pendiente'},
    {id: 'private', name: 'Privada'},
]
export const stringReplacement = {
    '&#038;': '&',
    '&#8211;': '-',
    '&#8216;': '\'',
    '&#8217;': '\'',
    '&#8220;': '"',
    '&#8221;': '"',
    '<p>': '',
    '</p>': '',
    '\n': '',
}