import { Pagination } from "react-bootstrap";

const PaginationBar = ({ page, totalPages, onPageChange }) => {
  const safeTotal = Math.min(totalPages || 1, 500);

  if (safeTotal <= 1) {
    return null;
  }

  const pages = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(safeTotal, page + 2);

  for (let current = start; current <= end; current += 1) {
    pages.push(
      <Pagination.Item
        key={current}
        active={current === page}
        onClick={() => onPageChange(current)}
      >
        {current}
      </Pagination.Item>
    );
  }

  return (
    <Pagination className="justify-content-center flex-wrap mt-4">
      <Pagination.First onClick={() => onPageChange(1)} disabled={page === 1} />
      <Pagination.Prev onClick={() => onPageChange(page - 1)} disabled={page === 1} />
      {start > 1 && <Pagination.Ellipsis disabled />}
      {pages}
      {end < safeTotal && <Pagination.Ellipsis disabled />}
      <Pagination.Next onClick={() => onPageChange(page + 1)} disabled={page === safeTotal} />
      <Pagination.Last
        onClick={() => onPageChange(safeTotal)}
        disabled={page === safeTotal}
      />
    </Pagination>
  );
};

export default PaginationBar;
