import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CategoryType, Pagination } from "@/types";

export function AllCategories({
  categoryData,
}: {
  categoryData: { data: CategoryType[]; pagination: Pagination } | null;
}) {
  return (
    <div>
      <h4 className="text-[24px] text-center mt-8 font-semibold mb-5">
        All Categories
      </h4>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Serial</TableHead>
            <TableHead>Crated Date</TableHead>
            <TableHead>Category Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categoryData?.data.map((item, idx) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell>{item.createdAt}</TableCell>
              <TableCell>{item.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
