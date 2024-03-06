import { Checkbox } from "@/components/ui/checkbox";

const TestPage = () => {
    return (
        <main
            className={`flex min-h-screen md:flex-row flex-col items-center md:items-start justify-start md:justify-center gap-2 mt-24 mb-10 m-4 p-2 rounded`}
        >
            <Checkbox className="rounded-sm"/>
        </main>
    );
}
 
export default TestPage;