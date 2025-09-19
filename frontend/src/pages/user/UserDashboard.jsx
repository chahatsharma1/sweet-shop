import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSweets, searchSweets, purchaseSweet } from '@/state/sweet/Action';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Loader2, ShoppingCart, Minus, Plus, Filter } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

const SweetCard = ({ sweet }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(0);
    const { isLoading } = useSelector(store => store.sweet);

    const handlePurchase = () => {
        if (quantity === 0) {
            toast.error("Please select a quantity greater than zero.");
            return;
        }
        dispatch(purchaseSweet(sweet.id, quantity));
    };

    const handleIncrement = () => {
        if (quantity < sweet.quantity) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecrement = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    const isLowStock = sweet?.quantity > 0 && sweet?.quantity <= 10;

    return (
        <Card className="flex flex-col overflow-hidden shadow-lg border-border transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
            <div className="p-4 flex-grow flex flex-col">
                <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-xl font-serif">{sweet?.name}</CardTitle>
                    <CardDescription>{sweet?.category}</CardDescription>
                </CardHeader>
                <CardContent className="p-0 flex-grow">
                    <div className="flex justify-between items-center my-4">
                        <p className="font-semibold text-xl text-primary">₹{sweet?.price?.toFixed(2)}</p>
                        {sweet?.quantity > 0 ? (
                            <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                                isLowStock
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                                    : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                            }`}>
                                {isLowStock ? `Low Stock (${sweet.quantity} left)` : `${sweet.quantity} in Stock`}
                            </span>
                        ) : (
                            <span className="px-2 py-1 text-xs font-bold rounded-full bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300">
                                Out of Stock
                            </span>
                        )}
                    </div>
                </CardContent>
                {sweet?.quantity > 0 && (
                    <div className="flex items-center gap-2 mt-auto pt-2">
                        <div className="flex items-center border rounded-md w-[35%]">
                            <Button variant="ghost" size="icon" className="h-10 w-10" onClick={handleDecrement} disabled={quantity <= 0}>
                                <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-full text-center font-semibold text-lg">{quantity}</span>
                            <Button variant="ghost" size="icon" className="h-10 w-10" onClick={handleIncrement} disabled={quantity >= sweet.quantity}>
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        <Button onClick={handlePurchase} disabled={isLoading} className="w-[62%] h-10">
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Purchase
                        </Button>
                    </div>
                )}
            </div>
        </Card>
    );
};

const UserDashboard = () => {
    const dispatch = useDispatch();
    const { sweets, isLoading, error } = useSelector(store => store.sweet);

    const [filters, setFilters] = useState({
        name: '',
        category: '',
        minPrice: '',
        maxPrice: '',
    });
    const [priceError, setPriceError] = useState(null);

    const [originalSweets, setOriginalSweets] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [priceOptions, setPriceOptions] = useState([]);

    useEffect(() => {
        dispatch(getAllSweets());
    }, [dispatch]);

    useEffect(() => {
        if (!isLoading && sweets.length > 0 && originalSweets.length === 0) {
            setOriginalSweets(sweets);
            const uniqueCategories = [...new Set(sweets.map(sweet => sweet.category))];
            setCategoryOptions(uniqueCategories);
            const maxPrice = Math.max(...sweets.map(s => s.price));
            const options = [];
            for (let i = 0; i <= maxPrice; i += 100) {
                const price = Math.floor(i / 100) * 100;
                options.push(price);
            }
            setPriceOptions(options.filter(p => p > 0));
        }
    }, [sweets, isLoading, originalSweets]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        if (priceError) setPriceError(null);
    };

    const handleSelectChange = (name, value) => {
        setFilters(prev => ({ ...prev, [name]: value === 'all' || value === 'any' ? '' : value }));
        if (priceError) setPriceError(null);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const min = parseFloat(filters.minPrice);
        const max = parseFloat(filters.maxPrice);

        if (filters.minPrice && filters.maxPrice && max < min) {
            setPriceError("Max price cannot be less than min price.");
            toast.error("Max price cannot be less than min price.");
            return;
        }
        setPriceError(null);

        const searchParams = { ...filters };
        if (searchParams.minPrice && !searchParams.maxPrice && originalSweets.length > 0) {
            searchParams.maxPrice = String(Math.max(...originalSweets.map(s => s.price)));
        }
        if (searchParams.maxPrice && !searchParams.minPrice) {
            searchParams.minPrice = '0';
        }
        const activeFilters = Object.fromEntries(
            Object.entries(searchParams).filter(([_, value]) => value !== '')
        );
        if (Object.keys(activeFilters).length === 0) {
            dispatch(getAllSweets());
        } else {
            dispatch(searchSweets(activeFilters));
        }
    };

    const clearFilters = () => {
        setFilters({ name: '', category: '', minPrice: '', maxPrice: '' });
        setPriceError(null);
        dispatch(getAllSweets());
    };

    return (
        <div className="bg-background text-foreground min-h-screen">
            <Toaster position="top-center" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold font-serif">Our Delicious Sweets</h1>
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <Input
                            name="name"
                            placeholder="Search by name..."
                            value={filters.name}
                            onChange={handleFilterChange}
                            className="w-full md:w-64"
                        />
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="shrink-0">
                                    <Filter className="h-4 w-4 mr-2" />
                                    Filter
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80" align="end">
                                <form onSubmit={handleSearch}>
                                    <div className="grid gap-4">
                                        <div className="space-y-2">
                                            <h4 className="font-medium leading-none">Filters</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Refine your search results.
                                            </p>
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="space-y-1">
                                                <label className="text-xs font-medium">Category</label>
                                                <Select onValueChange={(value) => handleSelectChange("category", value)} value={filters.category || "all"}>
                                                    <SelectTrigger><SelectValue/></SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="all">All Categories</SelectItem>
                                                        {categoryOptions.map((cat) => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="space-y-1">
                                                    <label className="text-xs font-medium">Min Price</label>
                                                    <Select onValueChange={(value) => handleSelectChange("minPrice", value)} value={filters.minPrice || "any"}>
                                                        <SelectTrigger><SelectValue/></SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="any">Any</SelectItem>
                                                            {priceOptions.map((price) => <SelectItem key={price} value={String(price)}>₹{price}</SelectItem>)}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-xs font-medium">Max Price</label>
                                                    <Select onValueChange={(value) => handleSelectChange("maxPrice", value)} value={filters.maxPrice || "any"}>
                                                        <SelectTrigger><SelectValue/></SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="any">Any</SelectItem>
                                                            {priceOptions.map((price) => <SelectItem key={price} value={String(price)}>₹{price}</SelectItem>)}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                            {priceError && <p className="text-destructive text-xs font-semibold text-center">{priceError}</p>}
                                        </div>
                                        <div className="flex justify-end gap-2 pt-2">
                                            <Button type="button" variant="outline" size="sm" onClick={clearFilters}>Clear</Button>
                                            <Button type="submit" size="sm">Apply</Button>
                                        </div>
                                    </div>
                                </form>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                {isLoading && <div className="flex justify-center my-8"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>}
                {error && <p className="text-center text-destructive font-semibold">{error}</p>}

                {!isLoading && !error && sweets?.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {sweets.map(sweet => (
                            <SweetCard key={sweet.id} sweet={sweet} />
                        ))}
                    </div>
                )}
                {!isLoading && !error && sweets?.length === 0 && (
                    <p className="text-center text-muted-foreground mt-12 text-lg">No sweets found. Try a different search or clear the filters!</p>
                )}
            </div>
        </div>
    );
};

export default UserDashboard;