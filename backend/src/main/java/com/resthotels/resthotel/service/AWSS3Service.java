package com.resthotels.resthotel.service;


import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.resthotels.resthotel.exception.OurException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

@Service
public class AWSS3Service {
    private final String bucketName = "resthotelimages";

    @Value(("${aws.s3.access.key}"))
    private String awsS3AccessKey;

    @Value(("${aws.s3.secret.key}"))
    private String awsS3SecretKey;

    public String saveImageToS3(MultipartFile photo){
        String s3LocationImage = null;

        try {
            String s3FileName = photo.getOriginalFilename();
            BasicAWSCredentials awsCredentials = new BasicAWSCredentials(awsS3AccessKey, awsS3SecretKey);
            AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                    .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                    .withRegion(Regions.US_WEST_2)
                    .build();
            InputStream inputStream = photo.getInputStream();

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType("image/jpeg");

            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, s3FileName, inputStream, metadata);
            s3Client.putObject(putObjectRequest);
            return  "https://"+bucketName+".s3.us-west-2.amazonaws.com/"+s3FileName;
        }catch (Exception e){
            throw new OurException("Unable to upload image to s3 bucket" + e.getMessage());
        }
    }
}
