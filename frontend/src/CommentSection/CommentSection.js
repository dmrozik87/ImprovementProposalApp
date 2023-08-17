import React, {useEffect, useState} from 'react';
import Comment from "../Comment";
import {Button} from "react-bootstrap";

const CommentSection = ({improvementProposalId, userData}) => {

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

    return (
        <div>

            <div className="mt-5">
                {comments.map(comment =>
                    <Comment
                        comment={comment} key={comment.id}
                        comments={comments}
                        setComments={setComments}
                        userData={userData}
                    />
                )}
            </div>

            <div className="mt-5">
                        <textarea
                            style={{width: "100%"}}
                            onChange={(event) => handleCommentChange(event.target.value)}
                            value={comment.text}
                        >
                        </textarea>
                <Button onClick={() => submitComment()}>Post Comment</Button>
            </div>
        </div>
    );
};

export default CommentSection;