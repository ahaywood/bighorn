export const TableOfContentsItem = ({ node }) => {
  // We replace characters to match the id to make sure it's a valid anchor we're targeting
  const id = node.value
    .toLowerCase()
    .replace(/[^\w-]/g, '-') // replace non-word characters with a dash
    .replace(/-+/g, '-') // replace multiple dashes with a single one
    .replace(/-+$/, '') // remove any dashes at the end of the string

  return (
    <li className="my-1 leading-4">
      <a href={`#${id}`}>{node.value}</a>
      {node.children.length > 0 && (
        <ul className="list-none border-l border-gray-300 pl-2">
          {node.children.map((child) => (
            <TableOfContentsItem key={child.value + child.depth} node={child} />
          ))}
        </ul>
      )}
    </li>
  )
}
