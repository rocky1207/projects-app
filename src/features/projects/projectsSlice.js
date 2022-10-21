import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    avatar: null,
    members: [],
    editProjectInfo: {
        id: null,
        projectName: '',
        projectDescription: '',
        employees: [],
    },
    projectInfo: {
        id: null,
        name: '',
        description: '',
        employees: {},
        logo: '',
    },
};

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        projectsAuthor: (state, action) => {
            state.avatar = action.payload;
        },
        addProjectMembers: (state, action) => {
            if (!action.payload) {
                state.members = [];
            } else {
                if (!state.members.includes(action.payload)) {
                    state.members = [...state.members, action.payload];
                }
            }
        },
        removeProjectMember: (state, action) => {
            state.members = state.members.filter(
                (member) => member !== action.payload
            );
        },
        deleteAllProjectMembers: (state, action) => {
            state.members = action.payload;
        },
        editProject: (state, action) => {
            const projectInfo = action.payload.projectToEdit;

            const isOn = action.payload.isOn;

            state.editProjectInfo.id = projectInfo.id;
            state.editProjectInfo.projectName = projectInfo.attributes.name;
            state.editProjectInfo.projectDescription =
                projectInfo.attributes.description;
            state.editProjectInfo.employees =
                projectInfo.attributes.employees.data.map((employee) => {
                    return {
                        isOn: isOn,
                        id: employee.id,
                        logo: employee?.attributes?.logo?.data?.attributes,

                        username: employee.attributes.username,
                        email: employee.attributes.email,
                    };
                });
        },
        projectLogoState: (state, action) => {
            /*
            state.projectInfo.id = action.payload.id;
            state.projectInfo.name = action.payload.name;
            state.projectInfo.description = action.payload.description;
            state.projectInfo.employees = action.payload.employees;
            state.projectInfo.logo = action.payload.logo;
            */
            state.projectInfo = {
                id: action.payload.id,
                name: action.payload.attributes.name,
                description: action.payload.attributes.description,
                employees: action.payload.attributes.employees,
                logo: action.payload.attributes.logo.data.attributes.formats
                    .thumbnail.url,
            };

            //state.projectLogo = action.payload;
        },
    },
});

export const {
    projectsAuthor,
    addProjectMembers,
    removeProjectMember,
    deleteAllProjectMembers,
    editProject,
    projectLogoState,
} = projectsSlice.actions;

export default projectsSlice.reducer;
