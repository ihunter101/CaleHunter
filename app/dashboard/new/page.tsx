import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";


export default function NewEventRoute() {
    return (
        <div className="w-full h-full flex flex-1 items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>Add new Appointment type</CardTitle>
                    <CardDescription>
                        Creat a new Appointment type that allows people to book your services!
                    </CardDescription>
                </CardHeader>

                <form>
                    <CardContent className="grid gap-y-5">
                        <div className="flex flex-col gap-y-2">
                            <Label>Title</Label>
                            <Input placeholder='30 minute appointment'/>
                        </div>
                        
                        <div className="flex flex-col gap-y-2"> 
                            <Label>URL SLug</Label>
                            <div className="flex round-md">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0  border-muted bg-muted text-sm text-muted-foreground">
                                    Calehunter.com/
                                </span>
                                <Input className="rounded-l-none"
                                placeholder="example-url-1" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label>Description</Label>
                            <Textarea placeholder="Meet me in this meeting" />
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label>Duration</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Please select meeting duration"/>
                                        
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Duration</SelectLabel>
                                        <SelectItem value="15">15 mins</SelectItem>
                                        <SelectItem Value="30">30 mins</SelectItem>
                                        <SelectItem Value="45">45 mins</SelectItem>
                                        <SelectItem Value="60">1 hour </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-y-2">
                            <Label>Video Call Provider</Label>
                        </div>
                    </CardContent>
                </form>
            </Card>
        
        </div>
    )
}