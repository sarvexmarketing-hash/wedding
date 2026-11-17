"use client";

import React, { use } from "react";
import { InvitationExperienceClient } from "@/components/invitation-engine/InvitationExperienceClient";

export default function GuestInvitePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  return <InvitationExperienceClient slug={resolvedParams.slug} />;
}
