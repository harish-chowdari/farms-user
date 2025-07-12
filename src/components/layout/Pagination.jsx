// components/Pagination.js
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ 
    currentPage, 
    totalPages, 
    onPageChange, 
    showPageNumbers = true,
    showInfo = true,
    total = 0,
    pageSize = 1
}) => {
    const getVisiblePages = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];
        
        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i);
        }
        
        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }
        
        rangeWithDots.push(...range);
        
        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        } else {
            rangeWithDots.push(totalPages);
        }
        
        return rangeWithDots;
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePageClick = (page) => {
        if (page !== '...' && page !== currentPage) {
            onPageChange(page);
        }
    };

    if (totalPages <= 1) return null;

    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, total);

    return (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
            {showInfo && (
                <div className="hidden sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{startItem}</span> to{' '}
                            <span className="font-medium">{endItem}</span> of{' '}
                            <span className="font-medium">{total}</span> results
                        </p>
                    </div>
                </div>
            )}
            
            <div className="flex items-center justify-between w-full sm:w-auto">
                <div className="flex items-center gap-2">
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                            currentPage === 1
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        <ChevronLeft size={16} className="mr-1" />
                        Previous
                    </button>
                    
                    { (
                        <div className="hidden sm:flex items-center gap-1">
                            {getVisiblePages().map((page, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageClick(page)}
                                    disabled={page === '...' || page === currentPage}
                                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                                        page === currentPage
                                            ? 'bg-blue-600 text-white'
                                            : page === '...'
                                            ? 'text-gray-400 cursor-default'
                                            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    )}
                    
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                            currentPage === totalPages
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        Next
                        <ChevronRight size={16} className="ml-1" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;