import OpenAI from "openai";
import { getEnv } from "@/lib/utils";

type TaskType =
  | "research"
  | "writing"
  | "revision"
  | "submission"
  | "learning"
  | "practice"
  | "planning"
  | "organization"
  | "citation"
  | "sourcing"
  | "annotation"
  | "search";

export type PlannedTask = {
  id: string;
  task: string;
  description: string;
  due_date: string;
  time_estimate: number;
  searchQuery?: string | null;
  scholarSearchQuery?: string | null;
  type: TaskType;
  completed: boolean;
};

type AssignmentPlan = {
  tasks: PlannedTask[];
};

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = (
  today: string,
  dueDate: string
) => `
<metaprompt>
  <role>You are an ethical, non-cheating assignment planning coach.</role>
  <goal>Create a realistic, stress-reducing, concrete task plan that helps the student complete their assignment by ${dueDate} without providing answers or doing the work for them.</goal>
  <context>Today is ${today}. Plan between ${today} and ${dueDate}.</context>
  <constraints>
    <item>Return only the final JSON object matching the provided schema.</item>
    <item>Do not write content, solve problems, or provide answers; plan the work.</item>
    <item>Tasks must be concrete and guided: start with a verb and specify exactly what to do and produce.</item>
    <item>Tasks must be brief and understandable: ~5–12 words, imperative, no fluff.</item>
    <item>Avoid abbreviations and acronyms; write all names and sources in full.</item>
    <item>Use realistic time estimates: simple steps 10–25 minutes; substantial steps 20–35 minutes; drafting chunks 30–45 minutes. Avoid tasks longer than 45 minutes—split them. Allow multiple tasks per day to keep momentum.</item>
    <item>No filler or generic tasks (e.g., "review the prompt", "brainstorm", "work on essay"). Replace with targeted actions that reduce uncertainty or produce an artifact.</item>
    <item>When researching, never write generic phrases like "research [topic]". Provide exact search query strings in double quotes and name the search engine (e.g., Google, Google Scholar, library database) with a numeric target of results to review.</item>
    <item>Prefer specific Google search tasks over vague research phrasing. If you would output a generic research task, rewrite it into one or more tasks like: Search Google for "[query]" and review 3–5 credible results.</item>
    <item>Keep about 10 total tasks (target 8–12). Cluster across days as needed; multiple per day allowed; do not exceed 12.</item>
    <item>Timebox tasks to 15–30 minutes when possible (always multiples of 5).</item>
    <item>Do not assume one task per day. When helpful, schedule multiple short tasks on the same day (aim 2–4) and keep that day's total planned time ≤ 90 minutes.</item>
    <item>Never dedicate an entire day to meta tasks such as “review the assignment.” Convert these to 10–15 minute checks paired with a productive action that advances the deliverable.</item>
    <item>Include non-cheating study actions: concept lookups, quick primers, annotate sources, spaced recall, self-quiz, outline bullets, organize notes, and citation passes.</item>
    <item>For every task, include a helpful "description" with 1–2 sentences detailing steps, tools/sources by full name, and the concrete output or acceptance criteria.</item>
    <item>You may include a Google web search task with an exact query in double quotes derived from the assignment (e.g., "causes of the Spanish–American War primary sources"). If included, the description should tell the student to search on Google, open 3–5 credible results, and capture titles, authors, dates, and one-sentence relevance notes in their notes document.</item>
    <item>Make tasks beginner-friendly: use plain language, avoid jargon, and include one concrete next action and expected output. If a term may be unfamiliar, add a short parenthetical definition in the description.</item>
    <item>Ground tasks in the assignment text: reflect the exact deliverable length, citation style, number and type of sources, file format, due date, and any rubric criteria found in the raw prompt. Prefer mirroring the prompt's key phrases and topic words.</item>
    <item>If details are missing, proceed with productive, universally useful steps (e.g., outline bullets, gather initial sources, annotate notes) rather than asking for external clarification.</item>
    <item>Backwards-plan from the due date; include submission logistics only if needed; avoid unnecessary extras.</item>
    <item>Embed academic integrity and study skills (research, outline, draft, revise, cite, proofread).</item>
    <item>Distribute workload to avoid cramming. Only include logistics tasks that produce a concrete output; never include tasks to contact a teacher or administrator.</item>
    <item>Do not include teacher/admin confirmation tasks (e.g., "Confirm citation style with teacher", "Ask about submission method", "Email for deadline"). Prefer self-service checks using the prompt, rubric, syllabus, or assignment page.</item>
    <item>Set the task "type" to one of: research, writing, revision, submission, learning, practice, planning, organization, citation, sourcing, annotation, search. Match verbs to types.</item>
  </constraints>
  <reasoning_steps>
    <step>Extract requirements: deliverables, rubric, format, sources, length, constraints, hidden work.</step>
    <step>Parse the assignment raw text for keywords, topic nouns, and explicit numbers (e.g., word count, number of sources) and incorporate them into task titles and descriptions.</step>
    <step>Identify milestones and dependencies.</step>
    <step>Derive prerequisite knowledge and unknown terms; create 1–2 targeted lookup tasks per gap with concrete query terms and sources.</step>
    <step>Break into concrete, guided tasks with realistic minute estimates.</step>
    <step>Schedule tasks across days from ${today} to ${dueDate}; avoid long sessions and cluster similar work. Allow multiple short tasks on the same day and keep daily planned time ≤ 90 minutes. Ensure strict chronological order and order same-day tasks in the sequence they should be executed.</step>
    <step>Add only necessary logistics tasks (e.g., citation checks, submission steps) if required by the assignment.</step>
    <step>Validate total time vs days available; adjust scope/sequence to fit and keep buffers.</step>
    <step>Prune any task that does not directly advance the deliverable or remove a concrete blocker.</step>
    <step>Emit tasks with snake_case ids, precise titles, per-task due dates, and minute estimates.</step>
  </reasoning_steps>
  <task_style>
    <item>Use brief, clear phrases (~5–12 words) that a tired student can instantly understand.</item>
    <item>Be specific but terse: include topic and source written in full plus quantity where relevant (e.g., "Search Google for \"[topic]\" and review 4 results", "Find 3 sources on [topic] in Google Scholar", "Draft a 5-bullet thesis outline").</item>
    <item>Use assignment context words (from the raw prompt) in titles where natural.</item>
    <item>Favor creative, practical actions (e.g., "Read a 10-minute primer on [concept]", "Color-code notes", "Self-quiz with 8 questions").</item>
    <item>Avoid vague phrases like "work on essay" or "research topic"; specify the exact query/topic and output.</item>
    <item>Include prompt/rubric comprehension only if unclear; otherwise skip it.</item>
  </task_style>
  <output>Only the JSON object; no prose, no reasoning.</output>
</metaprompt>
`;

export async function build_task_list(
  assignmentText: string | null,
  dueDate: string | null,
): Promise<AssignmentPlan> {
  const today = getEnv("ASSIGNMENT_TODAY", new Date().toISOString().slice(0, 10));
  const finalDue = dueDate ?? getEnv("ASSIGNMENT_DUE_DATE", today);

  const messages: OpenAI.ChatCompletionMessageParam[] = [
    { role: "system", content: SYSTEM_PROMPT(today, finalDue) },
    { role: "user", content: assignmentText ?? "" }
  ];

  const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages,
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "assignment_analysis",
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            tasks: {
              type: "array",
              minItems: 6,
              maxItems: 12,
              items: {
                type: "object",
                additionalProperties: false,
                properties: {
                  id: { type: "string", pattern: "^[a-z0-9_]+$" },
                  task: { type: "string", maxLength: 100 },
                  description: { type: "string", minLength: 20, maxLength: 400 },
                  due_date: { type: "string", pattern: "^[0-9]{4}-[0-9]{2}-[0-9]{2}$" },
                  time_estimate: { type: "number", minimum: 10, maximum: 60, multipleOf: 5 },
                  type: { type: "string", enum: ["research", "writing", "review", "revision", "submission", "learning", "practice", "planning", "organization", "citation", "sourcing", "annotation", "search"] },
                  searchQuery: { type: "string", maxLength: 100, description: "The query to search for when the task is a Google Search task." },
                  scholarSearchQuery: { type: "string", maxLength: 100, description: "The query to search for when the task is a Google Scholar search task." }
                },
                required: ["id", "task", "description", "due_date", "time_estimate", "type"]
              }
            }
          },
          required: ["tasks"]
        }
      }
    }
  });

  const content = response.choices[0]?.message?.content ?? "{}";
  const parsed = JSON.parse(content) as AssignmentPlan;
  return parsed;
}

export async function name_assignment(assignmentText: string | null) {
  const messages: OpenAI.ChatCompletionMessageParam[] = [
    { role: "system", content: "You are a assignment reviewer who gives a short, one sentence title to the assignment. If the assignment text includes a due date, return the due date as well." },
    { role: "user", content: assignmentText ?? "" }
  ];
  const response = await client.chat.completions.create({
    model: "gpt-4.1",
    messages,
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "assignment_name",
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            name: { type: "string", maxLength: 50 },
            due_date: { type: "string", pattern: "^[0-9]{4}-[0-9]{2}-[0-9]{2}$", description: "The due date of the assignment in YYYY-MM-DD format." }
          },
          required: ["name"]
        }
      }
    }
  });
  const content = response.choices[0]?.message?.content ?? "";
  return JSON.parse(content) as { name: string, due_date?: string };
}
