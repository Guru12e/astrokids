"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  ChevronDown,
  Image as ImageIcon,
  Star,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";
import { toast } from "react-toastify";
import { nakshatras, zodiac } from "@/constant/constant";

const ZODIAC_SIGNS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

const NAKSHATRAS = [
  "Ashwini",
  "Bharani",
  "Krittika",
  "Rohini",
  "Mrigashira",
  "Ardra",
  "Punarvasu",
  "Pushya",
  "Ashlesha",
  "Magha",
  "Purva Phalguni",
  "Uttara Phalguni",
  "Hasta",
  "Chitra",
  "Swati",
  "Vishakha",
  "Anuradha",
  "Jyeshta",
  "Moola",
  "Purva Ashadha",
  "Uttara Ashadha",
  "Shravana",
  "Dhanishta",
  "Shatabhisha",
  "Purva Bhadrapada",
  "Uttara Bhadrapada",
  "Revati",
];

function useMockFetch(endpoint) {
  const [data, setData] = useState(null);
  useEffect(() => {
    let mounted = true;
    setTimeout(() => {
      if (!mounted) return;
      if (endpoint === "/api/admin/products") {
        setData([
          {
            id: "p_1",
            title: "Astro Kids Moon Lamp",
            price: 1299,
            stock: 12,
            sign: "Cancer",
            nakshatra: "Rohini",
            images: [],
          },
          {
            id: "p_2",
            title: "Zodiac Storybook — Aries Edition",
            price: 499,
            stock: 50,
            sign: "Aries",
            nakshatra: "Ashwini",
            images: [],
          },
        ]);
      } else if (endpoint === "/api/admin/orders") {
        setData([
          {
            id: "o_1",
            customer: "Anita K.",
            total: 1798,
            status: "processing",
            createdAt: "2025-10-10",
          },
          {
            id: "o_2",
            customer: "Ravi P.",
            total: 499,
            status: "delivered",
            createdAt: "2025-10-08",
          },
        ]);
      }
    }, 400);
    return () => (mounted = false);
  }, [endpoint]);
  return data;
}

export default function AdminPanel() {
  const products = useMockFetch("/api/admin/products");
  const orders = useMockFetch("/api/admin/orders");
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="flex h-16 items-center px-8 border-b bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Star className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">
            AstroKids Cosmos Admin
          </h1>
        </div>
        <div className="ml-auto flex gap-2">
          <Dialog open={open}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setProduct(null);
                  setOpen(true);
                }}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              >
                <Star className="w-4 h-4 mr-2" />
                Launch New Product
              </Button>
            </DialogTrigger>
            <DialogContent
              setOpen={setOpen}
              className="max-w-3xl max-h-[90vh] px-5 overflow-hidden"
            >
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  Launch Stellar Product
                </DialogTitle>
                <DialogDescription>
                  Create a new cosmic product tailored for young stargazers.
                </DialogDescription>
              </DialogHeader>
              <AddProductForm product={product} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex">
        <aside className="w-80 border-r bg-white/80 backdrop-blur-sm">
          <ScrollArea className="h-[calc(100vh-4rem)] p-4">
            <MetricsSidebar products={products} orders={orders} />
          </ScrollArea>
        </aside>
        <main className="flex-1 p-8">
          <Tabs defaultValue="products" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-indigo-100 to-purple-100">
              <TabsTrigger
                value="products"
                className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
              >
                <Package className="w-4 h-4 mr-2" />
                Products
              </TabsTrigger>
              <TabsTrigger
                value="orders"
                className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Orders
              </TabsTrigger>
            </TabsList>
            <TabsContent value="products" className="space-y-4">
              <Card className="bg-white/60 backdrop-blur-sm shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-indigo-800">
                    <Package className="w-5 h-5" />
                    Product Galaxy
                  </CardTitle>
                  <CardDescription>
                    Manage your celestial inventory.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProductsGrid
                    products={products}
                    setOpen={setOpen}
                    setProduct={setProduct}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="orders" className="space-y-4">
              <Card className="bg-white/60 backdrop-blur-sm shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-purple-800">
                    <ShoppingCart className="w-5 h-5" />
                    Order Constellations
                  </CardTitle>
                  <CardDescription>
                    Track customer journeys through the stars.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <OrdersList orders={orders} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

function MetricsSidebar({ products, orders }) {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="w-5 h-5" />
            Quick Orbit
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-indigo-100">Total Products</span>
              <Badge variant="secondary" className="bg-white/20">
                {products ? products.length : "—"}
              </Badge>
            </div>
            <Separator className="bg-white/20" />
            <div className="flex justify-between text-sm">
              <span className="text-indigo-100">Active Orders</span>
              <Badge variant="secondary" className="bg-white/20">
                {orders
                  ? orders.filter((o) => o.status !== "delivered").length
                  : "—"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ProductsGrid({ products, setOpen, setProduct }) {
  if (!products)
    return (
      <div className="flex items-center justify-center p-8 text-gray-500">
        Launching products…
      </div>
    );
  if (products.length === 0)
    return (
      <div className="flex items-center justify-center p-8 text-gray-500">
        No products in orbit.
      </div>
    );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {products.map((p) => (
        <Card
          key={p.id}
          className="hover:shadow-md transition-shadow bg-white/50 backdrop-blur-sm"
        >
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-lg font-semibold text-gray-900 truncate">
              {p.title}
            </CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge
                variant="outline"
                className="text-indigo-600 border-indigo-300"
              >
                {p.sign || "Universal"}
              </Badge>
              <Badge
                variant="outline"
                className="text-indigo-600 border-indigo-300"
              >
                {p.nakshatra || "Universal"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Price</span>
              <span className="font-semibold text-indigo-600">₹{p.price}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Stock</span>
              <span className={p.stock > 0 ? "text-green-600" : "text-red-600"}>
                {p.stock}
              </span>
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setProduct(p);
                  setOpen(true);
                }}
              >
                Edit Orbit
              </Button>
              <Button size="sm" variant="destructive" className="w-20">
                Eject
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function OrdersList({ orders, open }) {
  if (!orders)
    return (
      <div className="flex items-center justify-center p-8 text-gray-500">
        Fetching orders…
      </div>
    );
  if (orders.length === 0)
    return (
      <div className="flex items-center justify-center p-8 text-gray-500">
        No orders detected.
      </div>
    );
  return (
    <div className="space-y-4">
      {orders.map((o) => (
        <Card
          key={o.id}
          className="hover:shadow-md transition-shadow bg-white/50 backdrop-blur-sm"
        >
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">{o.id}</CardTitle>
              <Badge
                variant={o.status === "delivered" ? "default" : "secondary"}
                className={
                  o.status === "delivered" ? "bg-green-500" : "bg-yellow-500"
                }
              >
                {o.status}
              </Badge>
            </div>
            <CardDescription className="text-sm text-gray-600">
              {o.customer}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Total</span>
              <span className="font-semibold text-purple-600">₹{o.total}</span>
            </div>
            <div className="text-xs text-gray-500">{o.createdAt}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function AddProductForm({ product }) {
  const [isChange, setIsChange] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [selectedSign, setSelectedSign] = useState("");
  const [selectedNakshatra, setSelectedNakshatra] = useState();
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [nakshatraOptions, setNakshatraOptions] = useState(nakshatras);

  useEffect(() => {
    if (product) {
      setIsChange(true);
      setTitle(product.title);
      setPrice(product.price);
      setDescription(product.description);
      setStock(product.stock);
      setSelectedSign(product.sign);
      setSelectedNakshatra(product.nakshatra);
      setImages(product.images);
    }
  }, []);

  useEffect(() => {
    if (selectedSign) {
      const index = zodiac.indexOf(selectedSign);
      let formattedNakshatras = [];

      if (index == 0) {
        formattedNakshatras.push(nakshatras[index * 2]);
        formattedNakshatras.push(nakshatras[index * 2] + 1);
        formattedNakshatras.push(nakshatras[index * 2] + 2);
      } else if (index == zodiac.length - 1) {
        formattedNakshatras.push(nakshatras[(index - 1) * 2] - 1);
        formattedNakshatras.push(nakshatras[(index - 1) * 2]);
        formattedNakshatras.push(nakshatras[index * 2] + 1);
      } else {
        formattedNakshatras.push(nakshatras[(index - 1) * 2] - 2);
        formattedNakshatras.push(nakshatras[(index - 1) * 2] + 1);
        formattedNakshatras.push(nakshatras[index * 2]);
      }

      setNakshatraOptions(formattedNakshatras);
    }
  }, [selectedSign]);

  function handleFileChange(e) {
    const files = Array.from(e.target.files || []);
    const previews = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      file,
    }));
    setImages((prev) => [...prev, ...previews]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        title,
        price: Number(price),
        description,
        stock: Number(stock),
        sign: selectedSign,
        nakshatras: selectedNakshatra,
        images: images.map((i) => i.name),
      };
      toast.success("Product launched (demo) — check console", {
        position: "top-right",
        autoClose: 3000,
      });
      setTitle("");
      setPrice(0);
      setDescription("");
      setStock(0);
      setSelectedSign("");
      setSelectedNakshatra();
      setImages([]);
    } catch (err) {
      console.error(err);
      alert("Launch failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ScrollArea>
      <form onSubmit={handleSubmit} className="space-y-6 px-4">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Star className="w-4 h-4 text-indigo-500" />
              Product Title
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Cosmic Moon Lamp for Dreamers"
              className="border-indigo-200 focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2">
                Price (₹)
              </label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border-indigo-200 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2">
                Initial Stock
              </label>
              <Input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="border-indigo-200 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2">
              Stellar Description
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the magic of this product..."
              rows={3}
              className="border-indigo-200 focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                Zodiac Sign
              </label>
              <Select
                value={selectedSign}
                onValueChange={(val) => setSelectedSign(val)}
              >
                <SelectTrigger className="border-indigo-200 focus:border-purple-500">
                  <SelectValue placeholder="Choose a sign" />
                </SelectTrigger>
                <SelectContent>
                  {ZODIAC_SIGNS.map((s) => (
                    <SelectItem
                      key={s}
                      value={s}
                      className="focus:bg-purple-50"
                    >
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                Nakshatra
              </label>
              <Select
                value={selectedNakshatra}
                onValueChange={(val) => setSelectedNakshatra(val)}
              >
                <SelectTrigger className="border-indigo-200 focus:border-purple-500">
                  <SelectValue placeholder="Choose a sign" />
                </SelectTrigger>
                <SelectContent>
                  {nakshatraOptions.map((s) => (
                    <SelectItem
                      key={s}
                      value={s}
                      className="focus:bg-purple-50"
                    >
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-pink-500" />
              Product Images (Upload Multiple)
            </label>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="border-indigo-200"
            />
            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-indigo-200"
                >
                  <img
                    src={img.url}
                    alt={img.name}
                    className="object-cover w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setImages((prev) => prev.filter((_, i) => i !== idx))
                    }
                    className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            disabled={submitting}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 w-full md:w-auto"
          >
            {submitting ? "Launching…" : "Launch Product"}
          </Button>
        </div>
      </form>
    </ScrollArea>
  );
}
