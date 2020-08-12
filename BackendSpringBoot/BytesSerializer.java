package com.example.SportApplication.model;

import java.io.IOException;

import org.apache.tomcat.util.codec.binary.Base64;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

public class BytesSerializer extends JsonSerializer<byte[]> {

    private static final long serialVersionUID = -5510353102817291511L;

    public BytesSerializer() {
    }

	@Override
	public void serialize(byte[] value, JsonGenerator gen, SerializerProvider provider) throws IOException {
		// TODO Auto-generated method stub
		gen.writeString(Base64.encodeBase64String(value));
	}

   
}