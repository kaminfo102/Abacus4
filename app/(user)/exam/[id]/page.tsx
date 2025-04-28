import { AbacusComponent } from "@/components/Abacus";

<div className="flex flex-col gap-4">
  <AbacusComponent onNumberChange={(number) => {
    // اینجا می‌توانید با عدد چرتکه کار کنید
    console.log("Abacus number:", number);
  }} />
  <ExamPageClient id={params.id} />
</div> 