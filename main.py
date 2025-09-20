import openai
from dotenv import load_dotenv
import os
from datetime import date
from parseAssignment import parseAssignment

load_dotenv()

client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def build_task_list(raw_text, due_date):
    today = os.getenv("ASSIGNMENT_TODAY", date.today().isoformat())
    response = client.chat.completions.create(
        model="gpt-5",
        messages=[
            {"role": "system", "content": f"""
<metaprompt>
  <role>You are an ethical, non-cheating assignment planning coach.</role>
  <goal>Create a realistic, stress-reducing, concrete task plan that helps the student complete their assignment by {due_date} without providing answers or doing the work for them.</goal>
  <context>Today is {today}. Plan between {today} and {due_date}.</context>
  <constraints>
    <item>Return only the final JSON object matching the provided schema.</item>
    <item>Do not write content, solve problems, or provide answers; plan the work.</item>
    <item>Tasks must be concrete and guided: start with a verb and specify exactly what to do and produce.</item>
    <item>Keep about 10 total tasks (target 8–12). Adjust based on days left and complexity; do not exceed 12.</item>
    <item>Timebox tasks to realistic durations (25–90 minutes) in multiples of 5 minutes.</item>
    <item>Backwards-plan from the due date; include buffers, checkpoints, and submission logistics.</item>
    <item>Embed academic integrity and study skills (research, outline, draft, revise, cite, proofread).</item>
    <item>Distribute workload to avoid cramming; include rest and contingency tasks when useful.</item>
  </constraints>
  <reasoning_steps>
    <step>Extract requirements: deliverables, rubric, format, sources, length, constraints, hidden work.</step>
    <step>Identify milestones and dependencies.</step>
    <step>Break into concrete, guided tasks with realistic minute estimates.</step>
    <step>Schedule tasks across days from {today} to {due_date}; avoid long sessions and cluster similar work.</step>
    <step>Add stress-reduction and logistics tasks (materials, clarifications, backups, submission check).</step>
    <step>Validate total time vs days available; adjust scope/sequence to fit and keep buffers.</step>
    <step>Emit tasks with snake_case ids, precise titles, per-task due dates, and minute estimates.</step>
  </reasoning_steps>
  <task_style>
    <item>Use plain language. One short sentence per task.</item>
    <item>Be specific: name the artifact or action and how many (e.g., "find 3 peer-reviewed sources", "draft 5-bullet outline").</item>
    <item>Avoid vague phrases like "work on essay" or "research topic".</item>
  </task_style>
  <output>Only the JSON object; no prose, no reasoning.</output>
</metaprompt>
"""},
            {"role": "user", "content": raw_text}
        ],
        response_format={"type": "json_schema", "json_schema": {
            "name": "assignment_analysis",
            "schema": {
                "type": "object",
                "additionalProperties": False,
                "properties": {
                    "tasks": {"type": "array", "minItems": 6, "maxItems": 12, "items": {"type": "object", "additionalProperties": False, "properties": {
                        "id": {"type": "string", "pattern": "^[a-z0-9_]+$", "description": "Snake_case id for the task."},
                        "task": {"type": "string", "description": "Concrete, guided task starting with a verb (e.g., 'find 3 sources in JSTOR', 'draft 5-bullet outline')."},
                        "due_date": {"type": "string", "pattern": "^[0-9]{4}-[0-9]{2}-[0-9]{2}$", "description": "ISO date (YYYY-MM-DD) when this task should be finished, on or before the final due date."},
                        "time_estimate": {"type": "number", "minimum": 10, "maximum": 120, "multipleOf": 5, "description": "Estimated minutes to complete this task."}
                    }, "required": ["id", "task", "due_date", "time_estimate"]}}
                },
                "required": ["tasks"]
            }
        }}
    )
    return response.choices[0].message.content

print(build_task_list(parseAssignment("assignments/assignment_apush.docx"), os.getenv("ASSIGNMENT_DUE_DATE", "2025-09-30")))