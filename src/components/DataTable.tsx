import React, { FC, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useRouter, useParams } from "next/navigation";


interface Props {
  headers: string[];
  data: any[];
  description?: string;
  // searchQuery: string;
  isLoading: boolean;
}

export const DataTable: FC<Props> = ({ headers, data, description, isLoading }) => {

  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const filteredData = data.filter((item) =>
    //accessing first header as it should be the one we are looking by
    item[headers[0].toLowerCase()].toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / parseInt(pageSize));

  // Get current page of data
  const indexOfLastItem = currentPage * parseInt(pageSize);
  const indexOfFirstItem = indexOfLastItem - parseInt(pageSize);
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle page size change
  const handlePageSizeChange = (value: string) => {
    setPageSize(value);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  return (
    <div>
      <Card>
        <CardHeader className="pb-3">
          <div className="mt-2 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={`Search ${description}...`}
              className="pl-8 w-full md:w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? showLoadingRows() : currentData.length > 0 ? generateTable(currentData, headers, description) : showEmptyDataContent()}
        </CardContent>
        {filteredData.length > 0 && (
          getFooterContent(indexOfFirstItem, indexOfLastItem, totalItems, pageSize, handlePageSizeChange, handlePageChange, currentPage, totalPages)
        )}
      </Card>
    </div>
  );
}

function getFooterContent(indexOfFirstItem: number, indexOfLastItem: number, totalItems: number, pageSize: string, handlePageSizeChange: (value: string) => void, handlePageChange: (page: number) => void, currentPage: number, totalPages: number): React.ReactNode {
  return <CardFooter className="flex items-center justify-between pt-0">
    <div className="text-sm text-muted-foreground">
      {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)} of {totalItems}
    </div>
    <div className="flex items-center space-x-6">
      <div className="flex items-center space-x-2">
        <Select
          value={pageSize}
          onValueChange={handlePageSizeChange}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent side="top">
            {["10", "15", "20"].map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0"
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-sm font-medium">
          {currentPage} of {totalPages}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 p-0"
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </CardFooter>;
}

function showEmptyDataContent(): React.ReactNode {
  return <div className="text-center py-10">
    <p className="text-muted-foreground mb-4">No companies found</p>
  </div>;
}

function generateTable(currentData: any[], headers: string[], description?: string): React.ReactNode {
  return <Table>
    <TableHeader>
      <TableRow className="hover:bg-transparent cursor-default">
        {headers.map((header, index) => (
          <TableHead
            key={index}
            //add hidden if want to hide when small screen
            className={index > 0 ? "md:table-cell" : ""}
          >
            {header}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {currentData.map((item) => (
        <TableRow
          key={item.id}
          className="cursor-pointer hover:bg-muted/50"
          onClick={() => router.push(`/${description}/${item.id}`)}
        >
          {headers.map((header, index) => (
            <TableCell
              key={index}
              className={index > 0 ? "font-medium" : "md:table-cell"}
            >
              {/* if website and has value do hyperlink otherwise '-' */}
              {header == "Website" && item[header.toLowerCase()]
                ? <a
                  href={`https://${item[header.toLowerCase()]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {item[header.toLowerCase()]}
                </a>
                : item[header.toLowerCase()] || "-"}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>;
}

function showLoadingRows(): React.ReactNode {
  return <div className="space-y-3">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="flex items-center space-x-4">
        <Skeleton className="h-12 w-full" />
      </div>
    ))}
  </div>;
}
