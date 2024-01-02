import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteBlog, getUserBlog } from "../../../apis/blog_apis";
import { GetBlog } from "../../../types/app-types";
import { theme } from "../../../theme";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { grayColor } from "../../../const/colors";
import CustomModal from "../../../components/CustomModal";

export default function ViewBlog() {
    const location = useLocation();
    const navigate = useNavigate();
    const [blog, setBlog] = useState<GetBlog | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const handleCloseModal = () => setOpenModal(false);

    const handleOpen = () => setOpenModal(true);

    const getBlog = async (blogId: number) => {
        try {
            const res = await getUserBlog(blogId);
            setBlog(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const blogId = location.state.blogId;
        if (blogId) {
            getBlog(blogId);
        }
    }, [location.state.blogId]);

    const handleDelete = async () => {
        try {
            if (blog?.blogId) {
                await deleteBlog(blog?.blogId);
                navigate("/blog");
            }
        } catch (e) {
            console.log(e);
        }
    };

    if (!blog) {
        return (
            <Grid container padding={theme.spacing(4)}>
                <Grid item xs={12} textAlign={"center"}></Grid>
            </Grid>
        );
    }

    return (
        <Grid container>
            <Grid
                item
                xs={12}
                marginBottom={theme.spacing(2)}
                display={"flex"}
                justifyContent={"space-between"}
            >
                <Button
                    style={{ textTransform: "none" }}
                    onClick={() => navigate(-1)}
                >
                    <ArrowBackIcon
                        fontSize="small"
                        style={{ color: grayColor }}
                    />
                    <Typography
                        marginLeft={theme.spacing(1)}
                        color={grayColor}
                        variant="body2"
                    >
                        Back to home
                    </Typography>
                </Button>
                <Box display={"flex"}>
                    <Button
                        variant="outlined"
                        style={{ marginRight: theme.spacing(2) }}
                        onClick={() => {
                            navigate("/update-blog", {
                                state: {
                                    blogId: blog.blogId,
                                    title: blog.title,
                                    body: blog.body,
                                },
                            });
                        }}
                    >
                        Update
                    </Button>
                    <Button variant="contained" onClick={handleOpen}>
                        Delete
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h2">{blog.title}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography
                    variant="subtitle2"
                    style={{ whiteSpace: "pre-line" }}
                >
                    {blog.body}
                </Typography>
            </Grid>
            <CustomModal
                height={200}
                open={openModal}
                handleClose={handleCloseModal}
            >
                <Grid container padding={theme.spacing(4)}>
                    <Grid item xs={12} marginBottom={theme.spacing(4)}>
                        <Typography variant="subtitle1" textAlign={"center"}>
                            Are you sure you want to delete this blog?
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        display={"flex"}
                        justifyContent={"center"}
                    >
                        <Button
                            variant="outlined"
                            style={{ marginRight: theme.spacing(2) }}
                            onClick={handleCloseModal}
                        >
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={handleDelete}>
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            </CustomModal>
        </Grid>
    );
}
