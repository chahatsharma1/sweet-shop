import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UnauthorizedPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
            <ShieldAlert className="h-16 w-16 text-destructive mb-4" />
            <h1 className="text-4xl font-bold text-foreground mb-2">
                Access Denied
            </h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-md">
                Sorry, you do not have the necessary permissions to view this page.
            </p>
            <Button asChild>
                <Link to="/">Go Back to Homepage</Link>
            </Button>
        </div>
    );
};

export default UnauthorizedPage;