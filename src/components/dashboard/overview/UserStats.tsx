import EndpointOverviewCard from '@/components/shared/Cards/EndpointOverviewCard';
import ProjectOverviewCard from '@/components/shared/Cards/ProjectOverviewCard';
import React from 'react';

const UserStats = () => {
    return (
        <div>
            <ProjectOverviewCard></ProjectOverviewCard>
            <EndpointOverviewCard></EndpointOverviewCard>
        </div>
    );
};

export default UserStats;