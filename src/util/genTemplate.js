

const FILE_HEADER = `\
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!-- This is an automatically generated file.
     It will be read and overwritten.
     DO NOT EDIT! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>`

// 4 whitespace
const INDENT = '    ';

const walkChildren = (root, indent = '') => `\
${indent}<DL><p>
${root.children.map((item) => listItem(item, indent + INDENT)).join('\n')}
${indent}</DL><p>`

const listItem = (item, indent = '') => item.href
    ? `\
${indent}<DT><A ${listProperty(item)}>${item.name}</A>`
    : `\
${indent}<DT><H3 ${listProperty(item)}>${item.name}</H3>
${walkChildren(item, indent + INDENT)}`;

const listProperty = (item) => Object
    .keys(item)
    .filter(x => !(['id', 'name', 'children'].includes(x)))
    .map(key => `${key.toUpperCase()}="${item[key]}"`)
    .join(' ')


export const generateTemplate = (data) => `\
${FILE_HEADER}
${walkChildren(data)}
`

