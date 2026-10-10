"use client";

import {
  Box,
  chakra,
  Button,
  Field,
  Flex,
  Heading,
  HStack,
  Input,
  NativeSelect,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useForm, type AnyFieldApi } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Check, CircleCheckBig, Send } from "lucide-react";
import { motion } from "motion/react";
import { parseAsString, useQueryState } from "nuqs";
import { useState } from "react";
import type { z } from "zod";
import { FaWhatsapp } from "react-icons/fa6";
import { ServiceIcon } from "@/components/ui/service-icon";
import { BUDGETS, QUOTE_STEPS, quoteFields, TIMELINES, type QuoteInput } from "@/lib/quote-schema";
import type { ServiceSummary } from "@/lib/types";
import { whatsappLink } from "@/lib/whatsapp";

function errorText(field: AnyFieldApi) {
  const err = field.state.meta.errors[0];
  if (!field.state.meta.isTouched || !err) return undefined;
  return typeof err === "string" ? err : (err as { message?: string }).message;
}

// Function validator for fields rendered from a mixed list, where the union of
// schema types can't be narrowed to the field's value type.
function zodCheck(schema: z.ZodType) {
  return ({ value }: { value: unknown }) => {
    const r = schema.safeParse(value);
    return r.success ? undefined : r.error.issues[0]?.message;
  };
}

export function QuoteForm({ services, whatsapp }: { services: ServiceSummary[]; whatsapp: string }) {
  const [preselected] = useQueryState("service", parseAsString.withDefault(""));
  const [step, setStep] = useState(0);

  const mutation = useMutation({
    mutationFn: async (values: QuoteInput) => {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Something went wrong. Please try again or reach us on WhatsApp.");
      return data;
    },
  });

  const form = useForm({
    defaultValues: {
      services: services.some((s) => s.slug === preselected) ? [preselected] : [],
      description: "",
      budget: "",
      timeline: "",
      name: "",
      email: "",
      phone: "",
      company: "",
      website: "",
    } as unknown as QuoteInput,
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync(value);
    },
  });

  const serviceTitle = (slug: string) => services.find((s) => s.slug === slug)?.title ?? slug;

  async function next() {
    const fields = QUOTE_STEPS[step].fields;
    // Decide from the schema itself, not field meta: field validators only
    // exist while their inputs are mounted (e.g. mid step-transition).
    const ok = fields.every((f) => quoteFields[f].safeParse(form.getFieldValue(f)).success);
    if (ok) return setStep((s) => s + 1);
    // Surface the messages on the visible inputs.
    fields.forEach((f) => form.setFieldMeta(f, (m) => ({ ...m, isTouched: true })));
    await Promise.all(fields.map((f) => form.validateField(f, "submit")));
  }

  if (mutation.isSuccess) {
    const v = form.state.values;
    const msg = `Hello Citrix! I just sent a quote request for ${v.services.map(serviceTitle).join(", ")}. My name is ${v.name}.`;
    return (
      <Stack align="center" textAlign="center" gap={5} py={10}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 14 }}>
          <Box color="brand.cyan">
            <CircleCheckBig size={72} strokeWidth={1.5} />
          </Box>
        </motion.div>
        <Heading as="h2" textStyle="h2" color="brand.blue">
          Thank you, {v.name.split(" ")[0]}!
        </Heading>
        <Text color="fg.muted" maxW="md">
          Your request is in. We&apos;ve emailed a copy to <b>{v.email}</b> and our team will get back to you within one business day.
        </Text>
        <Button asChild size="lg" rounded="full" bg="#25D366" color="white" _hover={{ bg: "#1EBE5A" }} px={8}>
          <a href={whatsappLink(whatsapp, msg)} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp /> Continue on WhatsApp
          </a>
        </Button>
      </Stack>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (step < QUOTE_STEPS.length - 1) void next();
        else void form.handleSubmit();
      }}
    >
      {/* Step indicator */}
      <HStack as="ol" gap={0} mb={10} aria-label="Progress">
        {QUOTE_STEPS.map((s, i) => (
          <Flex as="li" key={s.title} align="center" flex={i < QUOTE_STEPS.length - 1 ? 1 : undefined} listStyleType="none" aria-current={i === step ? "step" : undefined}>
            <HStack gap={2}>
              <Box display="grid" placeItems="center" boxSize={9} rounded="full" fontWeight="700" fontSize="sm" bg={i <= step ? "brand.blue" : "brand.mist"} color={i <= step ? "white" : "brand.blue"} transition="all 0.3s">
                {i < step ? <Check size={16} /> : i + 1}
              </Box>
              <Text fontWeight="700" fontFamily="heading" color={i <= step ? "brand.blue" : "fg.muted"} display={{ base: i === step ? "block" : "none", sm: "block" }}>
                {s.title}
              </Text>
            </HStack>
            {i < QUOTE_STEPS.length - 1 && <Box flex="1" h="2px" mx={3} bg={i < step ? "brand.blue" : "brand.ice"} transition="all 0.3s" />}
          </Flex>
        ))}
      </HStack>

      {/* Honeypot (visually hidden, skipped by keyboard and screen readers) */}
      <form.Field name="website">
        {(field) => (
          <Box position="absolute" left="-10000px" aria-hidden>
            <label>
              Website
              <input tabIndex={-1} autoComplete="off" value={field.state.value ?? ""} onChange={(e) => field.handleChange(e.target.value)} />
            </label>
          </Box>
        )}
      </form.Field>

      {/* Keyed enter-only animation: the new step mounts immediately, so the form never waits on an exit animation. */}
        <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
          {step === 0 && (
            <form.Field name="services" validators={{ onChange: quoteFields.services, onSubmit: quoteFields.services }}>
              {(field) => (
                <Field.Root invalid={!!errorText(field)}>
                  <Field.Label fontSize="lg" fontFamily="heading" fontWeight="700" color="brand.blue" mb={3}>
                    What can we help you with?
                  </Field.Label>
                  <SimpleGrid columns={{ base: 1, sm: 2 }} gap={3} w="full" role="group">
                    {services.map((s) => {
                      const checked = field.state.value.includes(s.slug);
                      return (
                        <chakra.button
                          type="button"
                          key={s.slug}
                          role="checkbox"
                          aria-checked={checked}
                          onClick={() =>
                            field.handleChange(checked ? field.state.value.filter((v) => v !== s.slug) : [...field.state.value, s.slug])
                          }
                          display="flex"
                          alignItems="center"
                          gap={3}
                          p={4}
                          textAlign="start"
                          rounded="xl"
                          borderWidth="2px"
                          borderColor={checked ? "brand.blue" : "blackAlpha.100"}
                          bg={checked ? "brand.mist" : "white"}
                          cursor="pointer"
                          transition="all 0.15s"
                          _hover={{ borderColor: "brand.cyan" }}
                          _focusVisible={{ outline: "2px solid", outlineColor: "brand.cyan", outlineOffset: "2px" }}
                        >
                          <Box display="grid" placeItems="center" boxSize={10} rounded="lg" bg={checked ? "brand.blue" : "brand.mist"} color={checked ? "white" : "brand.blue"} flexShrink={0}>
                            <ServiceIcon name={s.icon} size={20} />
                          </Box>
                          <Text fontWeight="700" color="brand.ink" flex="1">
                            {s.title}
                          </Text>
                          {checked && <Check size={18} color="#004E9B" />}
                        </chakra.button>
                      );
                    })}
                  </SimpleGrid>
                  <Field.ErrorText>{errorText(field)}</Field.ErrorText>
                </Field.Root>
              )}
            </form.Field>
          )}

          {step === 1 && (
            <Stack gap={6}>
              <form.Field name="description" validators={{ onBlur: quoteFields.description, onSubmit: quoteFields.description }}>
                {(field) => (
                  <Field.Root invalid={!!errorText(field)} required>
                    <Field.Label>Tell us about your project</Field.Label>
                    <Textarea
                      rows={6}
                      placeholder="e.g. 500 A5 flyers and 2 pull-up banners for a product launch on 15 November…"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    <Field.ErrorText>{errorText(field)}</Field.ErrorText>
                  </Field.Root>
                )}
              </form.Field>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                <form.Field name="budget" validators={{ onChange: quoteFields.budget, onSubmit: quoteFields.budget }}>
                  {(field) => (
                    <Field.Root invalid={!!errorText(field)} required>
                      <Field.Label>Estimated budget</Field.Label>
                      <NativeSelect.Root>
                        <NativeSelect.Field
                          placeholder="Select a range"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value as QuoteInput["budget"])}
                          onBlur={field.handleBlur}
                        >
                          {BUDGETS.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                      </NativeSelect.Root>
                      <Field.ErrorText>{errorText(field)}</Field.ErrorText>
                    </Field.Root>
                  )}
                </form.Field>
                <form.Field name="timeline" validators={{ onChange: quoteFields.timeline, onSubmit: quoteFields.timeline }}>
                  {(field) => (
                    <Field.Root invalid={!!errorText(field)} required>
                      <Field.Label>Timeline</Field.Label>
                      <NativeSelect.Root>
                        <NativeSelect.Field
                          placeholder="When do you need it?"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value as QuoteInput["timeline"])}
                          onBlur={field.handleBlur}
                        >
                          {TIMELINES.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                      </NativeSelect.Root>
                      <Field.ErrorText>{errorText(field)}</Field.ErrorText>
                    </Field.Root>
                  )}
                </form.Field>
              </SimpleGrid>
            </Stack>
          )}

          {step === 2 && (
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
              {(
                [
                  { name: "name", label: "Full name", type: "text", auto: "name", required: true },
                  { name: "company", label: "Company (optional)", type: "text", auto: "organization", required: false },
                  { name: "email", label: "Email", type: "email", auto: "email", required: true },
                  { name: "phone", label: "Phone / WhatsApp", type: "tel", auto: "tel", required: true },
                ] as const
              ).map((f) => (
                <form.Field key={f.name} name={f.name} validators={{ onBlur: zodCheck(quoteFields[f.name]), onSubmit: zodCheck(quoteFields[f.name]) }}>
                  {(field) => (
                    <Field.Root invalid={!!errorText(field)} required={f.required}>
                      <Field.Label>{f.label}</Field.Label>
                      <Input
                        type={f.type}
                        autoComplete={f.auto}
                        placeholder={f.name === "phone" ? "+256 7XX XXX XXX" : undefined}
                        value={(field.state.value as string) ?? ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                      <Field.ErrorText>{errorText(field)}</Field.ErrorText>
                    </Field.Root>
                  )}
                </form.Field>
              ))}
            </SimpleGrid>
          )}
        </motion.div>

      {mutation.isError && (
        <Box mt={6} p={4} rounded="lg" bg="red.50" color="red.700" role="alert">
          {mutation.error.message}
        </Box>
      )}

      <Flex mt={10} justify="space-between" gap={3}>
        {step > 0 ? (
          <Button type="button" variant="ghost" colorPalette="brand" rounded="full" onClick={() => setStep((s) => s - 1)}>
            <ArrowLeft /> Back
          </Button>
        ) : (
          <span />
        )}
        <form.Subscribe selector={(s) => s.isSubmitting}>
          {(isSubmitting) => (
            <Button type="submit" colorPalette="brand" rounded="full" size="lg" px={8} loading={isSubmitting} loadingText="Sending…">
              {step < QUOTE_STEPS.length - 1 ? (
                <>
                  Continue <ArrowRight />
                </>
              ) : (
                <>
                  Send request <Send />
                </>
              )}
            </Button>
          )}
        </form.Subscribe>
      </Flex>
    </form>
  );
}
