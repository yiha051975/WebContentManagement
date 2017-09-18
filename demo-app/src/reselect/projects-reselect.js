import {createSelector} from 'reselect';

const projects = state => state.projects;
const contents = state => state.contents;
const contentHistories = state => state.contentHistories;

export const projectSelector = createSelector(
    [projects, contents, contentHistories],
    (projects, contents, contentHistories) => {
        // console.log(projects, Object.keys(projects).length, contents, Object.keys(contents).length, contentHistories, Object.keys(contentHistories).length);
        if (!projects || Object.keys(projects).length === 0 || !contents || Object.keys(contents).length === 0 || !contentHistories || Object.keys(contentHistories).length === 0) {
            return [];
        }

        const selector = Object.keys(projects).map(projectId => {
            return {
                ...projects[projectId],
                contents: contents[projectId].map(content => {
                    let transformedContentHistories;

                    if (contentHistories && Array.isArray(contentHistories[content.id])) {
                        transformedContentHistories = contentHistories[content.id].map(contentHistory => {
                            return {
                                ...contentHistory
                            };
                        });
                    }

                    return {
                        ...content,
                        contentHistories: transformedContentHistories
                    };
                })
            }
        });

        return selector;
    }
);