import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { User } from "../../../types/auth-types";
import { useEffect, useState } from "react";
import { GetBlog } from "../../../types/app-types";
import { getAllUserBlogs } from "../../../apis/blog_apis";
import { theme } from "../../../theme";
import { useNavigate } from "react-router-dom";
import { lightGray } from "../../../const/colors";
import _ from "lodash";

interface IProps {
    user: User;
}

export default function RenderBlogs({ user }: IProps) {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState<GetBlog[] | null>(null);

    const getAllBlogsUser = async (userId: number) => {
        try {
            const res = await getAllUserBlogs(userId);
            setBlogs(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getAllBlogsUser(user?.userId);
    }, [user?.userId]);

    if (!blogs || _.isEmpty(blogs)) {
        return (
            <Grid
                container
                spacing={2}
                textAlign={"center"}
                marginTop={theme.spacing(20)}
            >
                <Grid item xs={12}>
                    <Typography variant="h1">
                        You haven't posted any blogs
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1">
                        Create your first blog!
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        onClick={() => {
                            navigate("/create-blog");
                        }}
                        variant="contained"
                    >
                        Create New Blog
                    </Button>
                </Grid>
            </Grid>
        );
    }

    return (
        <Grid container padding={theme.spacing(2)}>
            {!!blogs &&
                blogs.map((blog) => {
                    return (
                        <Grid
                            item
                            xs={3}
                            margin={theme.spacing(1)}
                            marginTop={theme.spacing(2)}
                            padding={theme.spacing(1)}
                            border={`${theme.spacing(0.2)} solid ${lightGray}`}
                            borderRadius={1}
                        >
                            <Box padding={theme.spacing(1)}>
                                <Typography variant="subtitle2">
                                    {blog.title}
                                </Typography>
                            </Box>
                            <Divider />
                            <Box padding={theme.spacing(1)}>
                                <Typography variant="caption">
                                    {blog.body.slice(0, 200)}...
                                </Typography>
                            </Box>
                            <Box padding={theme.spacing(1)}>
                                <Button
                                    onClick={() => {
                                        navigate("/view-blog", {
                                            state: { blogId: blog.blogId },
                                        });
                                    }}
                                    variant="contained"
                                >
                                    View Blog
                                </Button>
                            </Box>
                        </Grid>
                    );
                })}
        </Grid>
    );
}
