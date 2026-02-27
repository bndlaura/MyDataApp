export function paginate(items, page, perPage = 10) {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
}
