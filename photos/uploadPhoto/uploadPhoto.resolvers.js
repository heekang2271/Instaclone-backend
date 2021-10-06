import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

const resolverFn = async (_, { file, caption }, { loggedInUser }) => {
    let hashtagObj = [];
    if (caption) {
        // parse caption
        hashtagObj = processHashtags(caption);
    }
    // get or create Hashtags
    return await client.photo.create({
        data: {
            file,
            caption,
            user: {
                connect: {
                    id: loggedInUser.id,
                },
            },
            ...(hashtagObj.length > 0 && {
                hashtags: {
                    connectOrCreate: hashtagObj,
                },
            }),
        },
    });

    return false;

    // save the photo WITH the parsed hashtags
    // add the photo to the hashtags
};

export default {
    Mutation: {
        uploadPhoto: protectedResolver(resolverFn),
    },
};
