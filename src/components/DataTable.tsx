"use client";

import React, { FC, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
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
import { useRouter } from "next/navigation";

interface Props<T extends Record<string, any>> {
  headers: string[];
  data: T[];
  description?: string;
  isLoading: boolean;
  idField?: keyof T; // Allow customizing which field to use as ID
  searchField?: keyof T; // Allow customizing which field to search in
  onRowClick?: (item: T) => void; // Optional custom row click handler
  basePath?: string; // Base path for navigation when clicking a row
}

export const DataTable = <T extends Record<string, any>,>({
  headers,
  data,
  description = "items",
  isLoading,
  idField = "id" as keyof T,
  searchField,
  onRowClick,
  basePath
}: Props<T>) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  // Determine which field to search in (default to first header if not specified)
  const fieldToSearch = searchField || headers[0] as keyof T;

  const filteredData = data.filter((item) => {
    // Handle possible undefined or null values
    const fieldValue = item[fieldToSearch];
    if (fieldValue === undefined || fieldValue === null) return false;

    return String(fieldValue).toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Calculate pagination
  const totalItems = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / parseInt(pageSize)));

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

  // Handle row click
  const handleRowClick = (item: T) => {
    if (onRowClick) {
      onRowClick(item);
    } else if (basePath) {
      // Ensure the ID exists before navigating
      const id = item[idField];
      if (id !== undefined) {
        router.push(`${basePath}/${id}`);
      }
    }
  };

  return (
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
        {isLoading ? (
          <LoadingRows />
        ) : currentData.length > 0 ? (
          <DataTableContent
            data={currentData}
            headers={headers}
            handleRowClick={handleRowClick}
          />
        ) : (
          <EmptyState />
        )}
      </CardContent>

      {filteredData.length > 0 && (
        <TableFooter
          indexOfFirstItem={indexOfFirstItem}
          indexOfLastItem={indexOfLastItem}
          totalItems={totalItems}
          pageSize={pageSize}
          handlePageSizeChange={handlePageSizeChange}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </Card>
  );
};

// Component for displaying table content
const DataTableContent = <T extends Record<string, any>,>({
  data,
  headers,
  handleRowClick,
}: {
  data: T[];
  headers: string[];
  handleRowClick: (item: T) => void;
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent cursor-default">
          {headers.map((header, index) => (
            <TableHead
              key={index}
              className={index > 0 ? "md:table-cell" : ""}
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, rowIndex) => (
          <TableRow
            key={`row-${rowIndex}-${String(item.id || rowIndex)}`}
            className="cursor-pointer transition-colors hover:bg-green-100 dark:hover:bg-green-900/30"
            onClick={() => handleRowClick(item)}
          >
            {headers.map((header, cellIndex) => {
              // Direct access to the property using the header as the key
              const value = item[header];
              
              // Check if the current header might be a URL field
              const isUrlField = header.toLowerCase().includes('url') || 
                                header.toLowerCase().includes('website') || 
                                header.toLowerCase() === 'link';
              
              return (
                <TableCell
                  key={`cell-${rowIndex}-${cellIndex}`}
                  className={cellIndex > 0 ? "font-medium" : "md:table-cell"}
                >
                  {isUrlField && value ? (
                    <a
                      href={typeof value === 'string' ? (value.startsWith("http") ? value : `https://${value}`) : '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click when clicking the link
                      }}
                    >
                      {value}
                    </a>
                  ) : (
                    value || "-"
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

// Loading state component
const LoadingRows: FC = () => {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center w-full mb-4">
          <Skeleton className="h-12 w-full bg-gray-300 dark:bg-gray-300" />
        </div>
      ))}
    </div>
  );
};

// Empty state component
const EmptyState: FC = () => {
  return (
    <div className="text-center py-10">
      <p className="text-muted-foreground mb-4">No data found</p>
    </div>
  );
};

// Table footer with pagination
const TableFooter: FC<{
  indexOfFirstItem: number;
  indexOfLastItem: number;
  totalItems: number;
  pageSize: string;
  handlePageSizeChange: (value: string) => void;
  handlePageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
}> = ({
  indexOfFirstItem,
  indexOfLastItem,
  totalItems,
  pageSize,
  handlePageSizeChange,
  handlePageChange,
  currentPage,
  totalPages,
}) => {
    return (
      <CardFooter className="flex items-center justify-between pt-0">
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
                {["10", "15", "20", "50"].map((size) => (
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
      </CardFooter>
    );
  };