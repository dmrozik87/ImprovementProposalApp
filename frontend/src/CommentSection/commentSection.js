import React, {useEffect, useState} from 'react';
import Comment from "../Comment";
import {Button, Form} from "react-bootstrap";

const CommentSection = ({improvementProposalId, improvementProposalStatus, userData}) => {

    const emptyComment = {
        text: "",
        improvementProposal: {id: improvementProposalId},
        createdBy: {id: userData.id}
    }

    const [comment, setComment] = useState(emptyComment);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`/api/comments?improvementProposalId=${improvementProposalId}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET",
        }).then(response => {
            if (response.status === 200) return response.json();
        }).then(commentsData => {
            setComments(commentsData);
        })
    }, [])

    function handleCommentChange(value) {
        const commentCopy = {...comment};
        commentCopy.text = value;
        setComment(commentCopy);
    }

    function submitComment() {
        fetch(`/api/comments`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(comment)
        }).then(response => response.json())
            .then(commentData => {
                const commentsCopy = [...comments];
                commentsCopy.push(commentData);
                setComments(commentsCopy);
                setComment(emptyComment);
            })
    }

    function showPostCommentArea(improvementProposalStatus, role) {
        if (improvementProposalStatus === "Needs Update" && role === "SUBMITTER") return true;
        else if (improvementProposalStatus === "In Review" && role === "REVIEWER") return true;
        else return false;
    }

    return (
        <div>

            <div>
                {comments.map(comment =>
                    <Comment
                        comment={comment} key={comment.id}
                        comments={comments}
                        setComments={setComments}
                        userData={userData}
                    />
                )}
            </div>

            {showPostCommentArea(improvementProposalStatus, userData.role) ?
                <div>
                    <Form.Control
                        className={comments ? "mt-3" : ""}
                        id="comment"
                        as="textarea"
                        rows={3}
                        placeholder="Enter comment"
                        onChange={(event) => handleCommentChange(event.target.value)}
                        value={comment.text}
                    />

                    <Button
                        onClick={() => submitComment()}
                        className="mt-2"
                    >
                        Post Comment
                    </Button>
                </div>
                :
                <></>
            }

        </div>
    );
};

export default CommentSection;