import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllSweets,
    addSweet,
    updateSweet,
    deleteSweet,
    restockSweet
} from '@/state/sweet/Action';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SweetForm } from '@/pages/admin/SweetForm.jsx';
import {Eye, EyeOff, Loader2, MoreHorizontal, PlusCircle, UserPlus} from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { Card } from "@/components/ui/card.jsx";
import {createAdmin} from "@/state/Auth/Action.js";

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { sweets, isLoading } = useSelector(store => store.sweet);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isRestockOpen, setIsRestockOpen] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [isAdminFormOpen, setIsAdminFormOpen] = useState(false);
    const [selectedSweet, setSelectedSweet] = useState(null);
    const [restockQuantity, setRestockQuantity] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSweets, setFilteredSweets] = useState([]);
    const [adminFormData, setAdminFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    useEffect(() => {
        dispatch(getAllSweets());
    }, [dispatch]);

    useEffect(() => {
        if (searchTerm === "") {
            setFilteredSweets(sweets);
        } else {
            setFilteredSweets(
                sweets.filter(sweet =>
                    sweet.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, sweets]);

    const handleAddClick = () => {
        setSelectedSweet(null);
        setIsFormOpen(true);
    };

    const handleEditClick = (sweet) => {
        setSelectedSweet(sweet);
        setIsFormOpen(true);
    };

    const handleDeleteClick = (sweet) => {
        setSelectedSweet(sweet);
        setIsDeleteAlertOpen(true);
    };

    const handleRestockClick = (sweet) => {
        setSelectedSweet(sweet);
        setRestockQuantity(10);
        setIsRestockOpen(true);
    };

    const handleAddAdmin = (e) => {
        e.preventDefault();
        dispatch(createAdmin(adminFormData))
        setIsAdminFormOpen(false);
        setAdminFormData({ email: '', password: '' });
    };

    const handleAdminFormChange = (e) => {
        setAdminFormData({ ...adminFormData, [e.target.name]: e.target.value });
    };

    const confirmDelete = () => {
        if (selectedSweet) {
            dispatch(deleteSweet(selectedSweet.id));
            setIsDeleteAlertOpen(false);
            setSelectedSweet(null);
        }
    };

    const confirmRestock = () => {
        if (selectedSweet) {
            dispatch(restockSweet(selectedSweet.id, restockQuantity));
            setIsRestockOpen(false);
            setSelectedSweet(null);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <Toaster position="top-center" />
            <header className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-serif">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Manage your shop's sweets collection.</p>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <Input
                        placeholder="Search sweets by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-64"
                    />
                    <Button onClick={() => setIsAdminFormOpen(true)} variant="outline" className="shrink-0">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add Admin
                    </Button>
                    <Button onClick={handleAddClick} className="shrink-0">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Sweet
                    </Button>
                </div>
            </header>

            {isLoading && !sweets.length ? (
                <div className="flex justify-center my-8"><Loader2 className="h-8 w-8 animate-spin" /></div>
            ) : (
                <Card className="rounded-xl overflow-hidden border p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50 hover:bg-muted/50">
                                <TableHead className="px-6">Name</TableHead>
                                <TableHead className="px-6">Category</TableHead>
                                <TableHead className="text-right px-6">Price</TableHead>
                                <TableHead className="text-right px-6">Quantity</TableHead>
                                <TableHead className="text-right px-6">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredSweets.map((sweet) => (
                                <TableRow key={sweet.id}>
                                    <TableCell className="font-medium px-6">{sweet.name}</TableCell>
                                    <TableCell className="px-6">{sweet.category}</TableCell>
                                    <TableCell className="text-right px-6">₹{sweet.price.toFixed(2)}</TableCell>
                                    <TableCell className="text-right px-6">{sweet.quantity}</TableCell>
                                    <TableCell className="text-right px-6">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleEditClick(sweet)}>Edit</DropdownMenuItem>
                                                {sweet.quantity === 0 && (
                                                    <DropdownMenuItem onClick={() => handleRestockClick(sweet)}>Restock</DropdownMenuItem>
                                                )}
                                                <DropdownMenuItem onClick={() => handleDeleteClick(sweet)} className="text-destructive">Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            )}

            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{selectedSweet ? 'Edit Sweet' : 'Add New Sweet'}</DialogTitle>
                        <DialogDescription>
                            {selectedSweet ? 'Update the details of this sweet.' : 'Fill out the form to add a new sweet to your shop.'}
                        </DialogDescription>
                    </DialogHeader>
                    <SweetForm
                        initialData={selectedSweet}
                        onSubmit={(data) => {
                            if (selectedSweet) {
                                dispatch(updateSweet(selectedSweet.id, data));
                            } else {
                                dispatch(addSweet(data));
                            }
                            setIsFormOpen(false);
                        }}
                    />
                </DialogContent>
            </Dialog>

            <Dialog open={isRestockOpen} onOpenChange={setIsRestockOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Restock "{selectedSweet?.name}"</DialogTitle>
                        <DialogDescription>Enter the quantity to add to the current stock.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <Label htmlFor="restockQuantity">Quantity to Add</Label>
                        <Input
                            id="restockQuantity"
                            type="number"
                            value={restockQuantity}
                            onChange={(e) => setRestockQuantity(Number(e.target.value))}
                            min="1"
                        />
                    </div>
                    <Button onClick={confirmRestock}>Confirm Restock</Button>
                </DialogContent>
            </Dialog>

            <Dialog open={isAdminFormOpen} onOpenChange={setIsAdminFormOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create New Admin</DialogTitle>
                        <DialogDescription>
                            Enter the email and a password for the new admin account.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddAdmin} className="space-y-4 py-2">
                        <div className="space-y-2">
                            <Label htmlFor="email">Admin Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="admin@example.com"
                                value={adminFormData.email}
                                onChange={handleAdminFormChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="••••••••"
                                    value={adminFormData.password}
                                    onChange={handleAdminFormChange}
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute inset-y-0 right-0 h-full px-3 text-muted-foreground"
                                    onClick={togglePasswordVisibility}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>
                        <div className="pt-2">
                            <Button type="submit" className="w-full">Create Admin</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the sweet
                            "{selectedSweet?.name}" from your shop.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default AdminDashboard;
