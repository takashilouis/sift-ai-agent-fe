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

    return plan.tasks.map((task, index) => ({
        name: `task_${index}`,
        label: getTaskLabel(task.action),
        description: task.description || getTaskDescription(task.action),
        status: "pending" as const,
    }));
}

function getTaskLabel(action: string): string {
    const labels: { [key: string]: string } = {
        search: "Search Agent",
        scrape: "Scraper Agent",
        summarize: "Summarize Agent",
        sentiment: "Sentiment Agent",
        compare: "Compare Agent",
        final_report: "Final Report",
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
        label: "Planning",
        description: "Creating research plan",
        status: "pending",
    },
    {
        name: "task_executor",
        label: "Executing Tasks",
        description: "Running research tasks",
        status: "pending",
    },
    {
        name: "finalize",
        label: "Finalizing",
        description: "Compiling results",
        status: "pending",
    },
];
