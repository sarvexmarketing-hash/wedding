"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import { HighlightText } from "@/components/ui/highlight-text";
import { useWedding } from "@/context/WeddingContext";
import { Wedding } from "@/lib/types";
import {
  Button,
  Input,
  Label,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  RadioGroup,
  RadioGroupItem,
  Checkbox,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea
} from "@/components/ui/multistep-form";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Loader2,
  Sparkles,
  Heart,
  Calendar,
  MapPin,
  Building,
  CheckCircle2,
  ExternalLink,
  LogIn,
  Users,
  Utensils,
  Music,
  QrCode,
  ShieldCheck,
  Mail
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const steps = [
  { id: "couple", title: "The Couple" },
  { id: "venue", title: "Destination" },
  { id: "ceremonies", title: "Ceremonies" },
  { id: "stationery", title: "Stationery" },
  { id: "catering", title: "Hospitality" },
  { id: "modules", title: "Activation" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

const contentVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.28 } },
  exit: { opacity: 0, x: -30, transition: { duration: 0.18 } },
};

export default function SignupPage() {
  const router = useRouter();
  const { createNewWedding, allWeddings, switchWedding, setCurrentRole } = useWedding();

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdWedding, setCreatedWedding] = useState<Wedding | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    brideName: "",
    groomName: "",
    email: "",
    phone: "",
    weddingDate: "",
    city: "Hyderabad",
    primaryVenue: "",
    guestCountRange: "150-350",
    ceremonies: ["Mehendi", "Sangeet", "Vedic Wedding", "Palace Reception"],
    stationeryStyle: "royal-burgundy",
    musicTheme: "shehnai",
    dietaryPreference: "mixed",
    hotelRoomsNeeded: true,
    modules: ["Digital Stationery", "WhatsApp Engine", "Palace Check-In", "Catering AI"],
    specialNotes: ""
  });

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleCeremony = (ceremony: string) => {
    setFormData((prev) => {
      const list = [...prev.ceremonies];
      if (list.includes(ceremony)) {
        return { ...prev, ceremonies: list.filter((c) => c !== ceremony) };
      } else {
        return { ...prev, ceremonies: [...list, ceremony] };
      }
    });
  };

  const toggleModule = (module: string) => {
    setFormData((prev) => {
      const list = [...prev.modules];
      if (list.includes(module)) {
        return { ...prev, modules: list.filter((m) => m !== module) };
      } else {
        return { ...prev, modules: [...list, module] };
      }
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Step Validation
  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.brideName.trim() !== "" && formData.groomName.trim() !== "" && formData.email.trim() !== "";
      case 1:
        return formData.weddingDate.trim() !== "" && formData.city.trim() !== "" && formData.primaryVenue.trim() !== "";
      case 2:
        return formData.ceremonies.length > 0;
      case 3:
        return formData.stationeryStyle !== "";
      case 4:
        return formData.dietaryPreference !== "";
      case 5:
        return formData.modules.length > 0;
      default:
        return true;
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      const newWed = createNewWedding({
        brideName: formData.brideName || "Priya",
        groomName: formData.groomName || "Rahul",
        weddingDate: formData.weddingDate || "12 December 2026",
        city: formData.city || "Hyderabad",
        primaryVenue: formData.primaryVenue || "Taj Falaknuma Palace, Hyderabad",
        email: formData.email || "couple@domain.com"
      });

      setCreatedWedding(newWed);
      setIsSubmitting(false);
      toast.success("Wedding workspace initialized!");
    }, 1200);
  };

  const handleSelectAndLogin = (wId: string) => {
    switchWedding(wId);
    setCurrentRole("couple");
    router.push("/app");
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl text-center space-y-3">
        <Logo size="lg" className="justify-center" />
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D1B28]">
          {createdWedding ? (
            "Wedding Workspace Initialized!"
          ) : (
            <HighlightText
              text="Create Your Wedding in 2 Minutes"
              delay={0.2}
              className="rounded-lg bg-gradient-to-r from-[#C5A059]/30 via-[#74182E]/15 to-[#C5A059]/35 px-2 py-0.5 text-[#2D1B28]"
              inView
            />
          )}
        </h1>
        <p className="text-xs sm:text-sm text-[#7D597E] max-w-lg mx-auto">
          {createdWedding
            ? "Your royal wedding is registered. You can enter your command center or view live invitations."
            : "Configure your ceremonies, invitations, catering, and guest operations in one unified workspace."}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        {/* SUCCESS STATE */}
        {createdWedding ? (
          <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border-2 border-[#C5A059] shadow-soft-xl space-y-6 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DDCF]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Wedding Successfully Created
              </span>
              <span className="text-xs font-mono text-stone-500">{createdWedding.id}</span>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#FAF7F2] via-white to-[#F3ECE1] border border-[#C5A059] space-y-3">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#74182E] fill-current" />
                <span className="text-xs uppercase font-bold text-[#74182E] tracking-wider">
                  New Wedding Workspace
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1B28]">
                {createdWedding.coupleNames}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#4D334E] pt-1">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#C5A059]" />
                  <span>{createdWedding.weddingDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#C5A059]" />
                  <span>{createdWedding.city}</span>
                </div>
                <div className="sm:col-span-2 flex items-center gap-1.5 text-stone-600">
                  <Building className="w-4 h-4 text-[#C5A059]" />
                  <span className="truncate">{createdWedding.primaryVenue}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E8DDCF] flex items-center justify-between text-xs">
                <span className="text-[#7D597E] text-[11px]">Guest RSVP Link:</span>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/invite/${createdWedding.slug}`}
                    target="_blank"
                    className="font-mono text-[#74182E] text-[11px] underline flex items-center gap-1"
                  >
                    /invite/{createdWedding.slug} <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => handleSelectAndLogin(createdWedding.id)}
                className="w-full py-3.5 px-4 rounded-full bg-[#74182E] text-white text-xs font-bold hover:bg-[#581223] transition-colors shadow-soft flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4 text-[#E1CD98]" />
                <span>Log in to Workspace →</span>
              </button>

              <Link
                href="/login"
                className="w-full py-3.5 px-4 rounded-full bg-[#FAF7F2] text-[#2D1B28] text-xs font-semibold border border-[#E8DDCF] hover:bg-stone-100 transition-colors flex items-center justify-center gap-2"
              >
                <span>View on Login Screen</span>
              </Link>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => {
                  setCreatedWedding(null);
                  setCurrentStep(0);
                }}
                className="text-xs font-medium text-stone-500 hover:text-stone-800 underline"
              >
                + Create another wedding workspace
              </button>
            </div>
          </div>
        ) : (
          /* MULTISTEP ONBOARDING FORM */
          <div className="w-full">
            {/* Step Progress Bar */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-between items-center px-2 mb-2">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    className="flex flex-col items-center cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => {
                      if (index <= currentStep) {
                        setCurrentStep(index);
                      }
                    }}
                  >
                    <motion.div
                      className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300",
                        index < currentStep
                          ? "bg-[#74182E] text-white"
                          : index === currentStep
                          ? "bg-[#74182E] text-white ring-4 ring-[#74182E]/20 shadow-md"
                          : "bg-[#E8DDCF] text-stone-500"
                      )}
                      whileTap={{ scale: 0.92 }}
                    >
                      {index < currentStep ? <Check className="w-3 h-3" /> : index + 1}
                    </motion.div>
                    <span
                      className={cn(
                        "text-[11px] mt-1.5 hidden sm:block tracking-tight font-medium",
                        index === currentStep
                          ? "text-[#74182E] font-bold"
                          : "text-stone-400"
                      )}
                    >
                      {step.title}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Connecting Progress Track */}
              <div className="w-full bg-[#E8DDCF]/60 h-2 rounded-full overflow-hidden mt-3 shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#C5A059] to-[#74182E]"
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                />
              </div>
            </motion.div>

            {/* Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card className="border border-[#E8DDCF] bg-white shadow-soft-xl rounded-3xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={contentVariants}
                  >
                    {/* Step 1: The Couple */}
                    {currentStep === 0 && (
                      <>
                        <CardHeader className="pb-3 border-b border-[#FAF7F2]">
                          <CardTitle className="text-xl sm:text-2xl font-serif text-[#2D1B28]">
                            Tell us about the couple
                          </CardTitle>
                          <CardDescription className="text-xs text-[#7D597E]">
                            Step 1: The auspicious names that will grace invitations and guest communications
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <motion.div variants={fadeInUp} className="space-y-1.5">
                              <Label htmlFor="brideName" className="text-xs font-semibold text-[#2D1B28]">
                                Bride&apos;s Name *
                              </Label>
                              <Input
                                id="brideName"
                                placeholder="e.g. Priya"
                                value={formData.brideName}
                                onChange={(e) => updateField("brideName", e.target.value)}
                                className="rounded-xl border-[#E8DDCF] focus:border-[#74182E] focus:ring-1 focus:ring-[#74182E]"
                              />
                            </motion.div>

                            <motion.div variants={fadeInUp} className="space-y-1.5">
                              <Label htmlFor="groomName" className="text-xs font-semibold text-[#2D1B28]">
                                Groom&apos;s Name *
                              </Label>
                              <Input
                                id="groomName"
                                placeholder="e.g. Rahul"
                                value={formData.groomName}
                                onChange={(e) => updateField("groomName", e.target.value)}
                                className="rounded-xl border-[#E8DDCF] focus:border-[#74182E] focus:ring-1 focus:ring-[#74182E]"
                              />
                            </motion.div>
                          </div>

                          <motion.div variants={fadeInUp} className="space-y-1.5">
                            <Label htmlFor="email" className="text-xs font-semibold text-[#2D1B28]">
                              Account Email Address *
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="couple@domain.com"
                              value={formData.email}
                              onChange={(e) => updateField("email", e.target.value)}
                              className="rounded-xl border-[#E8DDCF] focus:border-[#74182E] focus:ring-1 focus:ring-[#74182E]"
                            />
                            <p className="text-[11px] text-stone-400">Used for signing in and operational alerts.</p>
                          </motion.div>

                          <motion.div variants={fadeInUp} className="space-y-1.5">
                            <Label htmlFor="phone" className="text-xs font-semibold text-[#2D1B28]">
                              Primary WhatsApp / Mobile (Optional)
                            </Label>
                            <Input
                              id="phone"
                              placeholder="+91 98765 43210"
                              value={formData.phone}
                              onChange={(e) => updateField("phone", e.target.value)}
                              className="rounded-xl border-[#E8DDCF] focus:border-[#74182E] focus:ring-1 focus:ring-[#74182E]"
                            />
                          </motion.div>
                        </CardContent>
                      </>
                    )}

                    {/* Step 2: Date & Destination */}
                    {currentStep === 1 && (
                      <>
                        <CardHeader className="pb-3 border-b border-[#FAF7F2]">
                          <CardTitle className="text-xl sm:text-2xl font-serif text-[#2D1B28]">
                            Date & Palace Destination
                          </CardTitle>
                          <CardDescription className="text-xs text-[#7D597E]">
                            Step 2: Where and when the royal celebrations will unfold
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-5">
                          <motion.div variants={fadeInUp} className="space-y-1.5">
                            <Label htmlFor="weddingDate" className="text-xs font-semibold text-[#2D1B28]">
                              Wedding Date *
                            </Label>
                            <Input
                              id="weddingDate"
                              placeholder="e.g. 12 Dec 2026"
                              value={formData.weddingDate}
                              onChange={(e) => updateField("weddingDate", e.target.value)}
                              className="rounded-xl border-[#E8DDCF] focus:border-[#74182E] focus:ring-1 focus:ring-[#74182E]"
                            />
                          </motion.div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <motion.div variants={fadeInUp} className="space-y-1.5">
                              <Label htmlFor="city" className="text-xs font-semibold text-[#2D1B28]">
                                City / Destination Region *
                              </Label>
                              <Select
                                value={formData.city}
                                onValueChange={(val) => updateField("city", val)}
                              >
                                <SelectTrigger id="city" className="rounded-xl border-[#E8DDCF]">
                                  <SelectValue placeholder="Select destination" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Udaipur">Udaipur, Rajasthan</SelectItem>
                                  <SelectItem value="Jaipur">Jaipur, Rajasthan</SelectItem>
                                  <SelectItem value="Hyderabad">Hyderabad, Telangana</SelectItem>
                                  <SelectItem value="Goa">Goa (Coastal Luxury)</SelectItem>
                                  <SelectItem value="Lake Como">Lake Como, Italy</SelectItem>
                                  <SelectItem value="Dubai">Dubai, UAE</SelectItem>
                                  <SelectItem value="Bali">Bali, Indonesia</SelectItem>
                                  <SelectItem value="London">London, UK</SelectItem>
                                  <SelectItem value="Delhi NCR">Delhi NCR</SelectItem>
                                </SelectContent>
                              </Select>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="space-y-1.5">
                              <Label htmlFor="primaryVenue" className="text-xs font-semibold text-[#2D1B28]">
                                Palace / Primary Venue *
                              </Label>
                              <Input
                                id="primaryVenue"
                                placeholder="e.g. Taj Falaknuma Palace"
                                value={formData.primaryVenue}
                                onChange={(e) => updateField("primaryVenue", e.target.value)}
                                className="rounded-xl border-[#E8DDCF] focus:border-[#74182E] focus:ring-1 focus:ring-[#74182E]"
                              />
                            </motion.div>
                          </div>
                        </CardContent>
                      </>
                    )}

                    {/* Step 3: Ceremonies & Scale */}
                    {currentStep === 2 && (
                      <>
                        <CardHeader className="pb-3 border-b border-[#FAF7F2]">
                          <CardTitle className="text-xl sm:text-2xl font-serif text-[#2D1B28]">
                            Ceremonies & Headcount Scale
                          </CardTitle>
                          <CardDescription className="text-xs text-[#7D597E]">
                            Step 3: Multi-day sacred celebrations and party sizes
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-5">
                          <motion.div variants={fadeInUp} className="space-y-1.5">
                            <Label className="text-xs font-semibold text-[#2D1B28]">
                              Expected Total Guest Count
                            </Label>
                            <Select
                              value={formData.guestCountRange}
                              onValueChange={(val) => updateField("guestCountRange", val)}
                            >
                              <SelectTrigger className="rounded-xl border-[#E8DDCF]">
                                <SelectValue placeholder="Select headcount range" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="under-150">Boutique Intimate (Under 150)</SelectItem>
                                <SelectItem value="150-350">Royal Destination (150 – 350 Guests)</SelectItem>
                                <SelectItem value="350-700">Grand Celebration (350 – 700 Guests)</SelectItem>
                                <SelectItem value="700+">Mega Palace Gala (700+ Guests)</SelectItem>
                              </SelectContent>
                            </Select>
                          </motion.div>

                          <motion.div variants={fadeInUp} className="space-y-2 pt-1">
                            <Label className="text-xs font-semibold text-[#2D1B28]">
                              Select Sacred Ceremonies to Include
                            </Label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {[
                                "Mehendi & High Tea",
                                "Haldi Ceremony",
                                "Sangeet & Cocktail Gala",
                                "Vedic Wedding Pheras",
                                "Grand Palace Reception",
                                "Welcome Dinner / Sundowner"
                              ].map((ceremony) => (
                                <div
                                  key={ceremony}
                                  onClick={() => toggleCeremony(ceremony)}
                                  className={cn(
                                    "flex items-center space-x-2 rounded-xl border p-3 cursor-pointer transition-all",
                                    formData.ceremonies.includes(ceremony)
                                      ? "border-[#74182E] bg-[#74182E]/5 text-[#74182E] font-medium"
                                      : "border-[#E8DDCF] hover:bg-stone-50 text-stone-600"
                                  )}
                                >
                                  <Checkbox
                                    id={`ceremony-${ceremony}`}
                                    checked={formData.ceremonies.includes(ceremony)}
                                    onCheckedChange={() => toggleCeremony(ceremony)}
                                  />
                                  <span className="text-xs cursor-pointer select-none">
                                    {ceremony}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        </CardContent>
                      </>
                    )}

                    {/* Step 4: Stationery & Visual Aesthetic */}
                    {currentStep === 3 && (
                      <>
                        <CardHeader className="pb-3 border-b border-[#FAF7F2]">
                          <CardTitle className="text-xl sm:text-2xl font-serif text-[#2D1B28]">
                            Stationery & Royal Aesthetic
                          </CardTitle>
                          <CardDescription className="text-xs text-[#7D597E]">
                            Step 4: Digital stationery styling for animated guest invitation links
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-5">
                          <motion.div variants={fadeInUp} className="space-y-2">
                            <Label className="text-xs font-semibold text-[#2D1B28]">
                              Invitation Theme Preference
                            </Label>
                            <RadioGroup
                              value={formData.stationeryStyle}
                              onValueChange={(val) => updateField("stationeryStyle", val)}
                              className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
                            >
                              {[
                                { val: "royal-burgundy", label: "Royal Palace Burgundy", desc: "Gold foil, wax seal, deep crimson" },
                                { val: "vedic-gold", label: "Vedic Heritage Gold", desc: "Sanskrit shlokas, antique parchment" },
                                { val: "contemporary", label: "Modern Minimal Editorial", desc: "Clean serif typography, ivory tones" },
                                { val: "lakeside", label: "Lakeside Floral Pastel", desc: "Soft blush, watercolor floral motifs" },
                              ].map((theme) => (
                                <div
                                  key={theme.val}
                                  className={cn(
                                    "flex items-start space-x-2.5 rounded-xl border p-3 cursor-pointer transition-all",
                                    formData.stationeryStyle === theme.val
                                      ? "border-[#74182E] bg-[#74182E]/5"
                                      : "border-[#E8DDCF] hover:bg-stone-50"
                                  )}
                                  onClick={() => updateField("stationeryStyle", theme.val)}
                                >
                                  <RadioGroupItem value={theme.val} id={theme.val} className="mt-0.5" />
                                  <div>
                                    <Label htmlFor={theme.val} className="text-xs font-semibold cursor-pointer text-[#2D1B28]">
                                      {theme.label}
                                    </Label>
                                    <p className="text-[11px] text-stone-500 leading-tight mt-0.5">
                                      {theme.desc}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </RadioGroup>
                          </motion.div>

                          <motion.div variants={fadeInUp} className="space-y-1.5 pt-2">
                            <Label className="text-xs font-semibold text-[#2D1B28] flex items-center gap-1.5">
                              <Music className="w-3.5 h-3.5 text-[#C5A059]" /> Background Music on Invitation Reveal
                            </Label>
                            <Select
                              value={formData.musicTheme}
                              onValueChange={(val) => updateField("musicTheme", val)}
                            >
                              <SelectTrigger className="rounded-xl border-[#E8DDCF]">
                                <SelectValue placeholder="Select music" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="shehnai">Classical Shehnai & Sitar Ragas</SelectItem>
                                <SelectItem value="romantic-piano">Modern Royal Acoustic Romance</SelectItem>
                                <SelectItem value="flute">Bespoke Bansuri & Tanpura</SelectItem>
                                <SelectItem value="silent">Silent / No Music</SelectItem>
                              </SelectContent>
                            </Select>
                          </motion.div>
                        </CardContent>
                      </>
                    )}

                    {/* Step 5: Hospitality & Catering */}
                    {currentStep === 4 && (
                      <>
                        <CardHeader className="pb-3 border-b border-[#FAF7F2]">
                          <CardTitle className="text-xl sm:text-2xl font-serif text-[#2D1B28]">
                            Hospitality & Catering Logistics
                          </CardTitle>
                          <CardDescription className="text-xs text-[#7D597E]">
                            Step 5: Banquet catering intelligence and accommodations
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-5">
                          <motion.div variants={fadeInUp} className="space-y-2">
                            <Label className="text-xs font-semibold text-[#2D1B28] flex items-center gap-1.5">
                              <Utensils className="w-3.5 h-3.5 text-[#74182E]" /> Primary Banquet Catering Strategy
                            </Label>
                            <RadioGroup
                              value={formData.dietaryPreference}
                              onValueChange={(val) => updateField("dietaryPreference", val)}
                              className="space-y-2"
                            >
                              {[
                                { val: "mixed", label: "Multi-Cuisine Splendor", desc: "Separate vegetarian & non-vegetarian gourmet counters" },
                                { val: "pure-veg-jain", label: "Strict Vegetarian & Pure Jain", desc: "Dedicated root-vegetable free kitchen lines" },
                                { val: "halal", label: "Halal Certified Royal Feast", desc: "Authentic Nawabi & Mughlai preparations" },
                              ].map((diet) => (
                                <div
                                  key={diet.val}
                                  className={cn(
                                    "flex items-start space-x-2.5 rounded-xl border p-3 cursor-pointer transition-all",
                                    formData.dietaryPreference === diet.val
                                      ? "border-[#74182E] bg-[#74182E]/5"
                                      : "border-[#E8DDCF] hover:bg-stone-50"
                                  )}
                                  onClick={() => updateField("dietaryPreference", diet.val)}
                                >
                                  <RadioGroupItem value={diet.val} id={diet.val} className="mt-0.5" />
                                  <div>
                                    <Label htmlFor={diet.val} className="text-xs font-semibold cursor-pointer text-[#2D1B28]">
                                      {diet.label}
                                    </Label>
                                    <p className="text-[11px] text-stone-500">{diet.desc}</p>
                                  </div>
                                </div>
                              ))}
                            </RadioGroup>
                          </motion.div>

                          <motion.div variants={fadeInUp} className="p-3.5 rounded-xl border border-[#E8DDCF] bg-[#FAF7F2]/50 flex items-center justify-between">
                            <div>
                              <p className="text-xs font-semibold text-[#2D1B28]">Hotel Suite & Room Allocations</p>
                              <p className="text-[11px] text-stone-500">Track palace room keys and airport escort passes</p>
                            </div>
                            <Checkbox
                              checked={formData.hotelRoomsNeeded}
                              onCheckedChange={(checked) => updateField("hotelRoomsNeeded", !!checked)}
                            />
                          </motion.div>
                        </CardContent>
                      </>
                    )}

                    {/* Step 6: Modules & Activation */}
                    {currentStep === 5 && (
                      <>
                        <CardHeader className="pb-3 border-b border-[#FAF7F2]">
                          <CardTitle className="text-xl sm:text-2xl font-serif text-[#2D1B28]">
                            Activate WeddingOS Modules
                          </CardTitle>
                          <CardDescription className="text-xs text-[#7D597E]">
                            Step 6: High-order operations enabled for your celebration
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-5">
                          <motion.div variants={fadeInUp} className="space-y-2">
                            <Label className="text-xs font-semibold text-[#2D1B28]">
                              Select Operational Modules
                            </Label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {[
                                "Digital Stationery & Wax Seal",
                                "WhatsApp RSVP Broadcasts",
                                "Palace Gate QR Passes",
                                "Catering Headcount AI",
                                "Family Clustering & VIP Tiers",
                                "Live Table & Seating Matrix"
                              ].map((mod) => (
                                <div
                                  key={mod}
                                  onClick={() => toggleModule(mod)}
                                  className={cn(
                                    "flex items-center space-x-2.5 rounded-xl border p-3 cursor-pointer transition-all",
                                    formData.modules.includes(mod)
                                      ? "border-[#74182E] bg-[#74182E]/5 text-[#74182E] font-medium"
                                      : "border-[#E8DDCF] hover:bg-stone-50 text-stone-600"
                                  )}
                                >
                                  <Checkbox
                                    id={`mod-${mod}`}
                                    checked={formData.modules.includes(mod)}
                                    onCheckedChange={() => toggleModule(mod)}
                                  />
                                  <span className="text-xs select-none">{mod}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>

                          <motion.div variants={fadeInUp} className="space-y-1.5 pt-1">
                            <Label htmlFor="specialNotes" className="text-xs font-semibold text-[#2D1B28]">
                              Special Family Traditions or Notes (Optional)
                            </Label>
                            <Textarea
                              id="specialNotes"
                              placeholder="Any custom ceremonies, elder protocols, or planner requirements..."
                              value={formData.specialNotes}
                              onChange={(e) => updateField("specialNotes", e.target.value)}
                              className="rounded-xl border-[#E8DDCF] text-xs min-h-[70px]"
                            />
                          </motion.div>
                        </CardContent>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Footer Controls */}
                <CardFooter className="flex justify-between items-center pt-5 pb-5 px-6 border-t border-[#FAF7F2] bg-white">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="rounded-full px-5 text-xs border-[#E8DDCF] text-stone-600 hover:bg-[#FAF7F2] transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 mr-1" /> Back
                  </Button>

                  <div className="text-[11px] text-stone-400 font-mono hidden sm:block">
                    Step {currentStep + 1} of {steps.length}
                  </div>

                  <Button
                    type="button"
                    onClick={currentStep === steps.length - 1 ? handleSubmit : nextStep}
                    disabled={!isStepValid() || isSubmitting}
                    className={cn(
                      "rounded-full px-6 text-xs font-bold transition-all shadow-soft",
                      currentStep === steps.length - 1
                        ? "bg-[#74182E] hover:bg-[#581223] text-white"
                        : "bg-[#74182E] hover:bg-[#581223] text-white"
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                        Initializing...
                      </>
                    ) : (
                      <>
                        {currentStep === steps.length - 1 ? "Create Wedding Free" : "Next Step"}
                        {currentStep === steps.length - 1 ? (
                          <Check className="w-3.5 h-3.5 ml-1.5" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 ml-1.5" />
                        )}
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        )}

        {/* Existing Weddings Selector (if any) */}
        {!createdWedding && allWeddings.length > 0 && (
          <div className="pt-6 border-t border-[#E8DDCF]/80 text-xs text-center space-y-2">
            <p className="text-stone-500 font-medium">Or open an existing wedding workspace:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {allWeddings.slice(0, 3).map((w) => (
                <button
                  key={w.id}
                  onClick={() => handleSelectAndLogin(w.id)}
                  className="px-3.5 py-1.5 rounded-full bg-white border border-[#E8DDCF] text-[#2D1B28] hover:border-[#74182E] transition-colors shadow-sm font-medium"
                >
                  {w.coupleNames} ({w.city})
                </button>
              ))}
            </div>
            <div className="pt-2">
              <Link href="/login" className="text-stone-500 hover:text-[#74182E] underline text-[11px]">
                Already have an account? Log in here
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
