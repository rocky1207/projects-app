import { validateNoteDatas } from './validateNoteDatas';

export const createNoteFunc = async (
    uploadImageData,
    currentUserId,
    note,
    projectInfo,
    postNote,

    toast
) => {
    const aprove = validateNoteDatas({
        description: note.noteDescription,
        title: note.noteTitle,
    });

    let data;
    if (aprove) {
        if (uploadImageData) {
            data = {
                data: {
                    project: projectInfo.id,
                    files: [uploadImageData[0].id],
                    description: note.noteDescription,
                    title: note.noteTitle,
                    author: currentUserId,
                    category: note.categoryId,
                },
            };
        } else {
            data = {
                data: {
                    project: projectInfo.id,
                    description: note.noteDescription,
                    title: note.noteTitle,
                    author: currentUserId,
                    category: note.categoryId,
                },
            };
        }

        try {
            await postNote(data);
        } catch (error) {
            console.log(error);
        }
    } else {
        toast.error('All filds must be filled');
    }
};
export const editNoteFunc = async (
    paramsId,
    uploadImageData,
    currentUserId,
    note,
    projectInfo,
    editNote,
    toast
) => {
    const aprove = validateNoteDatas({
        description: note.noteDescription,
        title: note.noteTitle,
    });
    let data;
    if (aprove) {
        if (uploadImageData) {
            data = {
                data: {
                    project: projectInfo.id,
                    files: [uploadImageData[0].id],
                    description: note.noteDescription,
                    title: note.noteTitle,
                    author: currentUserId,
                    category: note.categoryId,
                },
            };
        } else {
            data = {
                data: {
                    project: projectInfo.id,
                    description: note.noteDescription,
                    title: note.noteTitle,
                    author: currentUserId,
                    category: note.categoryId,
                },
            };
        }

        const editNoteDatas = { paramsId, data };
        try {
            await editNote(editNoteDatas);
        } catch (error) {
            console.log(error);
        }
    } else {
        toast.error('All filds must be filled');
    }
};
