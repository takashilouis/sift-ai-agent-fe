export interface Product {
    name: string;
    price: number;
    url: string;
    rating?: number;
    reviews?: number;
    description?: string;
    image?: string;
}

export interface SentimentAnalysis {
    overall: number;
    positive: number;
    negative: number;
    neutral: number;
    summary: string;
}

export interface ComparisonData {
    products: Product[];
    winner?: string;
    criteria: {
        price: string;
        quality: string;
        value: string;
    };
}

// New backend structure
export interface Task {
    action: "search" | "scrape" | "summarize" | "sentiment" | "compare" | "final_report";
    query?: string;
    from_task?: string;
    description?: string;
}

export interface ResearchPlan {
    intent: string;
    tasks: Task[];
    reasoning?: string;
}

export interface TaskResult {
    // Search results
    primary_url?: string;
    search_results?: any[];

    // Scraper results
    url?: string;
    product_data?: any;

    // Summarize results
    summary?: string;

    // Sentiment results
    sentiment?: SentimentAnalysis;

    // Compare results
    comparison?: ComparisonData;

    // Final report
    final_report?: string;

    // Error handling
    error?: string;
}

export interface ResearchState {
    query: string;
    plan?: ResearchPlan;
    task_results?: { [key: string]: TaskResult };
    current_task_index?: number;
    final_report?: string;
    error?: string;

    // Legacy fields (extracted from task_results for backward compatibility)
    urls?: string[];
    search_results?: any[];
    scraped_data?: any[];
    summary?: string;
    sentiment?: SentimentAnalysis;
    comparison?: ComparisonData;
    products?: Product[];
}

export interface AgentStep {
    name: string;
    label: string;
    description: string;
    status: "pending" | "active" | "completed" | "error";
    timestamp?: string;
}

// Dynamic step generation based on plan
export function getStepsFromPlan(plan?: ResearchPlan): AgentStep[] {
    if (!plan || !plan.tasks) {
        return DEFAULT_STEPS;
    }

    const steps: AgentStep[] = [];

    // Always start with Planner Agent (completed since we have the plan)
    steps.push({
        name: "planner",
        label: "Planner Agent",
        description: "Decomposing query into search tasks",
        status: "completed",
    });

    // Add a step for each task with ACTUAL backend agent names
    plan.tasks.forEach((task, index) => {
        const taskName = `task_${index}`;
        let label = "";
        let description = task.description || task.query || "";

        // Use ACTUAL backend agent names
        if (task.action === "search") {
            label = "Search Agent";
            description = `Searching: ${task.query || description}`;
        } else if (task.action === "scrape") {
            label = "Scraper Agent";
            description = description || "Scraping product data";
        } else if (task.action === "compare") {
            label = "Compare Agent";
            description = description || "Comparing products";
        } else if (task.action === "sentiment") {
            label = "Sentiment Agent";
            description = description || "Analyzing sentiment";
        } else if (task.action === "summarize") {
            label = "Summarize Agent";
            description = description || "Summarizing results";
        } else if (task.action === "final_report") {
            label = "Final Report Agent";
            description = description || "Generating comprehensive report";
        } else {
            const action = String(task.action);
            label = action.charAt(0).toUpperCase() + action.slice(1) + " Agent";
        }

        // Shorten description if too long
        if (description.length > 70) {
            description = description.substring(0, 67) + "...";
        }

        steps.push({
            name: taskName,
            label: label,
            description: description,
            status: "pending",
        });
    });

    // Final Report step is now part of the plan tasks (action: "final_report")
    // steps.push({
    //     name: "finalize",
    //     label: "Final Report Agent",
    //     description: "Generating final report",
    //     status: "pending",
    // });

    return steps;
}

function getTaskLabel(action: string): string {
    const labels: { [key: string]: string } = {
        search: "Search Agent",
        scrape: "Scraper Agent",
        summarize: "Summarize Agent",
        sentiment: "Sentiment Agent",
        compare: "Compare Agent",
        final_report: "Final Report Agent",
    };
    return labels[action] || action;
}

function getTaskDescription(action: string): string {
    const descriptions: { [key: string]: string } = {
        search: "Searching for products",
        scrape: "Extracting product information",
        summarize: "Generating summary",
        sentiment: "Analyzing sentiment",
        compare: "Comparing products",
        final_report: "Generating final report",
    };
    return descriptions[action] || "Processing...";
}

// Default steps for fallback
export const DEFAULT_STEPS: AgentStep[] = [
    {
        name: "planner",
        label: "Planner Agent",
        description: "Decomposing query into search tasks",
        status: "pending",
    },
    {
        name: "task_executor",
        label: "Search Agent",
        description: "Executing search strategy",
        status: "pending",
    },
    {
        name: "finalize",
        label: "Final Report Agent",
        description: "Generating final report",
        status: "pending",
    },
];
