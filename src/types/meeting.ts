export interface Meeting {
    id: number
    projectName: string
    meetingName: string
    meetingTopics: Topic[]
    durationInMs: number
}

export interface Topic {
    name: string
    relevantCount: number
    notRelevantCount: number
}

export interface ParticipantStats {
    participantName: string
    email: string
    minutes: number
    impactScore: number
}