"use client";

import React, { use } from "react";
import { InvitationExperienceClient } from "@/components/invitation-engine/InvitationExperienceClient";

export default function PersonalizedGuestInvitePage({
  params
}: {
  params: Promise<{ slug: string; guestToken: string }>;
}) {
  const resolvedParams = use(params);
  return (
    <InvitationExperienceClient
      slug={resolvedParams.slug}
      guestToken={resolvedParams.guestToken}
    />
  );
}
